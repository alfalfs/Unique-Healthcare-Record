const Patient = require('../models/Patient')
const User = require('../models/User')
const env = require('../DB')

exports.find = async(req, res) => {
    let userId = req.params.id;
    //let { userId, ppno } = req.body
    const patient = await Patient.findOne({ patientid: userId })
        .then(() => {
            console.log(patient);
            return res.status(200).json(patient);
        })
        .catch((err) => {
            console.log(' find failed:', err);
            return res.status(422).json({ 'error': 'Oops! Something went wrong' });
        })
}

exports.findAllPrescriptions = async(req, res) => {
    const { userId, ppno } = req.body
        // const patients = await Patient.find({ prescriptions.commitedBy: userId })
    const patients = await Patient.aggregate([{
            $match: { 'prescriptions.commitedBye': { userId } }
        }])
        .then(() => {
            console.log(patients);
            return res.status(200).json(patients);
        })
        .catch((err) => {
            console.log(' find failed:', err);
            return res.status(422).json({ 'error': 'Oops! Something went wrong' });
        })
}

exports.createProfile = async(req, res) => {
    const { userid, patientname, dob, sex, blood, address } = req.body
        // var str = '578df3efb618f5141202a196';
        // var mongoObjectId = mongoose.Types.ObjectId(str);
    const patient = new Patient({
            patientid: req.body.userid,
            patientname: req.body.patientname,
            dob: req.body.dob,
            sex: req.body.sex,
            blood: req.body.blood,
            address: req.body.address
                // prescriptions: []
        })
        // console.log(patient);
    await patient.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(422).json({ 'error': 'Oops! Something went wrong' })
        }
        console.log(data);
        return res.status(200).json({ 'inserted successfully': true });
    });
}

// exports.pushPrescription = async function(req, res) {
//     const { patientId, department, title, prescription, userId } = req.body
//     const patient = await Patient.findOne({ _id: patientId })
//     let newprescription = patient.prescriptions.create({
//         department: req.body.department,
//         title: req.body.title,
//         prescription: req.body.prescription,
//         commitedBy: req.body.userId
//     });
//     await patient.save((err, data) => {
//         if (err) {
//             console.log(err);
//             return res.status(422).json({ 'error': 'Oops! Something went wrong' })
//         }
//         console.log(data);
//         return res.status(200).json({ 'added prescription successfully': true });
//     });
// }

exports.createPrescription = async(req, res) => {
    const { patientId, department, title, prescription, userId } = req.body
    const patient = await Patient.findOne({ _id: patientId })
    patient.prescriptions.push({
        department: department,
        title: title,
        prescription: prescription,
        commitedBy: userId
    })
    await patient.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(422).json({ 'error': 'Oops! Something went wrong' })
        }
        console.log(data);
        return res.status(200).json({ 'updated prescription': true });
    });
}

exports.updatePrescription = async(req, res) => {
    const { patientId, prescriptionId, department, title, prescription, userId } = req.body
    const patient = await Patient.findOne({ _id: patientId })
        // const prescribed = await Patient.findOne({ patient.prescriptions._id: prescriptionId })   
        // patient.prescribed.title = 'newtitle',
        // patient.prescribed.prescription = 'newprescription'
        // const updated = await patient.save()
        // console.log(updated)
    const prescribed = patient.prescriptions.id(prescriptionId);
    prescribed.title = req.body.title
    prescribed.prescription = req.body.prescription

    await patient.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(422).json({ 'error': 'Oops! Something went wrong' })
        }
        console.log(data);
        return res.status(200).json({ 'updated prescription': true });
    });

}

exports.deletePrescription = async(req, res) => {
    // let prescriptionId = req.params.id;
    const { patientId, prescriptionId, userId } = req.body
    const patient = await Patient.findOne({ _id: patientId })
        // patient.prescriptions.id(prescriptionId).remove();
    patient.prescriptions.pull(prescriptionId)
        //patient.prescription.remove();
    patient.prescription = null
        //Patient.prescription.findByIdAndRemove(prescriptionId)
    await patient.save((err, data) => {
        if (err) {
            // return handleError(err);
            console.log(err);
            return res.status(422).json({ 'error': 'Oops! Something went wrong' })
        }
        console.log('the prescription were removed');
        return res.status(200).json({ 'deleted prescription': true });
    });
    // .then(() => {
    //     console.log('prescription deleted successfully');
    //     return res.status(200).json({ uid });

    // })
    // .catch((err) => {
    //     console.log('prescription delete failed', err);
    //     return res.status(422).json({ 'error': 'Oops! Something went wrong' });
    // })

}


// // Equivalent to `parent.children.pull(_id)`
// parent.children.id(_id).remove();
// // Equivalent to `parent.child = null`
// parent.child.remove();
// parent.save(function(err) {
//     if (err) return handleError(err);
//     console.log('the subdocs were removed');
// });