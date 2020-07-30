const User = require('../models/User')
const env = require('../DB')
const jwt = require('jsonwebtoken')

exports.register = function(req, res) {
    const { username, email, password, passwordConfirmation, role } = req.body
    if (!email || !password) {
        return res.status(422).json({ 'error': 'Please provide email or password' })
    }

    if (password != passwordConfirmation) {
        return res.status(422).json({ 'error': 'Password does not match' })
    }
    User.findOne({ email }, function(err, existingUser) {
        if (err) {
            return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
        }
        if (existingUser) {
            return res.status(422).json({ 'error': 'User already exists' })
        } else {
            const user = new User({
                username,
                email,
                password,
                role
            })

            user.save(function(err, data) {
                if (err) {
                    return res.status(422).json({
                        'error': 'Oops! Something went wrong'
                    })
                }
                return res.status(200).json({ 'registered': true })
                console.log(data);
            })
        }
    })
}
exports.login = function(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ 'error': 'Please provide email or password' })
    }
    User.findOne({ email }, function(err, user) {
        if (err) {
            return res.status(422).json({
                'error': 'Oops! Something went wrong'
            })
        }

        if (!user) {
            return res.status(422).json({ 'error': 'Invalid user' })
        }

        if (user.hasSamePassword(password)) {
            json_token = jwt.sign({
                    userId: user.id,
                    username: user.username,
                    userrole: user.role
                },
                env.secret, { expiresIn: '1h' })

            return res.json(json_token)
        } else {
            return res.status(422).json({ 'error': 'Wrong email or password' })
        }
    })
}

exports.authMiddleware = function(req, res, next) {
    const json_token = req.headers.authorization
    try {
        if (json_token) {
            const user = parseToken(json_token)
            User.findById(user.userId, function(err, user) {
                if (err) {
                    return res.status(422).json({
                        'error': 'Oops! Something went wrong'
                    })
                }
                if (user) {
                    res.locals.user = user
                    next()
                } else {
                    return res.status(422).json({ 'error': 'Not authorized user' })
                }
            })
        } else {
            return res.status(422).json({ 'error': 'Not authorized user' })
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}

//roleMiddleware

exports.roleauthorize = function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        // // authenticate JWT token and attach user to request object (req.user)
        // jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];

}



function parseToken(token) {
    return jwt.verify(token.split(' ')[1], env.secret)
}