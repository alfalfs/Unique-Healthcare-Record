import { Prescriptions } from './../prescriptions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PrescriptionModel } from "./../prescription.model";
import { AuthService } from './../../auth/auth.service';
import { PatientDataService } from './../patient-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {
   heading:String = "prescrption history";
   //myPrescriptions;
   myPrescriptions:PrescriptionModel[];
//  public myPrescriptions:Observable<Prescriptions> ;
  constructor(private patientDataService: PatientDataService,private auth: AuthService, private router: Router) { }
  
  userid = this.auth.getUserId();
  ngOnInit(): void {
      this.patientDataService.getmyPrescriptions(this.userid)
          .subscribe((data)=>{
           //this.myPrescriptions = JSON.stringify(data);
           this.myPrescriptions = JSON.parse(JSON.stringify(data));
            // .subscribe((data) => {
             // this.myPrescriptions = data;
              console.log(this.myPrescriptions);
           })
          // .subscribe(data=>{console.log(data);});
      }
}
