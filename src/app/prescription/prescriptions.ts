export interface Prescriptions {
    _id:String,
    patientid: String,
    patientname: String,
    dob: Date,
    sex: String,
    blood: String,
    address: String,
    createdAt: Date,   
    prescriptions: [
      {
        _id: String;
        department: String;
        title: String;
        prescription: String;
        commitedBy:String;
        createdAt:Date;
      }
    ]  
  }