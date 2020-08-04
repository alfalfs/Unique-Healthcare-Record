export class PrescriptionModel {
    constructor(
        public _id:String,
        public patientid: String,
        public patientname: String,
        public dob: Date,
        public sex: String,
        public blood: String,
        public address: String,
        public createdAt: Date,   
        public prescriptions: [{
            _id: String;
            department: String;
            title: String;
            prescription: String;
            commitedBy:String;
            createdAt:Date;
        }]){}
    }
