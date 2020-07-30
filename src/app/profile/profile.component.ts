import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../prescription/patient-data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  patients = [];
  constructor(private PatientDataService: PatientDataService) { }

  ngOnInit(): void {
    this.PatientDataService.getPatients().subscribe((patient) => {
      this.patients = patient;
    });
    // //calling getProducts() and loading the products to products array
    // this.productService.getProducts()
    // .subscribe((data)=>{
    //   this.products=JSON.parse(JSON.stringify(data));
    // })
  }

}
