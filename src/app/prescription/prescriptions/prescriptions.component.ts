import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { PatientDataService } from './../patient-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {

    
  constructor(private patientDataService: PatientDataService,private auth: AuthService, private router: Router) { }
  myPrescriptions = [];
  userid = this.auth.getUserId();
  ngOnInit(): void {
      this.patientDataService.getmyPrescriptions(this.userid)
          .subscribe(data => this.myPrescriptions = data)
          console.log(this.myPrescriptions);
  }

}
