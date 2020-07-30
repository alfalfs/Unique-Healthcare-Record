import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../patient-data.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {

  formData: any = {};
  errors: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
