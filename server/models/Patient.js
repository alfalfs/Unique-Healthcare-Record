const mongoose = require('mongoose')
const Schema = mongoose.Schema


const patientSchema = new Schema({
    // ppno: { type: String, unique: true, required: true },
    patientid: { type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'users', required: [true, 'No user id found'] },
    //patientid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    patientname: { type: String, required: true },
    dob: { type: Date, required: true },
    sex: { type: String, required: true, lowercase: true },
    blood: { type: String, required: true },
    address: { type: String, required: true },
    keynote: { type: String },
    prescriptions: [{
        department: String,
        title: { type: String, required: true },
        prescription: { type: String, required: true },
        commitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: [true, 'No user id found'] },
        createdAt: { type: Date, required: true, default: Date.now }
    }],
    createdAt: { type: Date, required: true, default: Date.now }
    //population     comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

module.exports = mongoose.model('Patient', patientSchema);