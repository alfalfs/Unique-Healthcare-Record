import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

    private _url = "http://localhost:5000/api/patients";

  constructor(private http:HttpClient) { }

  public createProfile(patientData: any): Observable<any> {
    const URI = this._url + '/patient';
    return this.http.post(URI, patientData);
  }
  
  public getProfile(patientData: any): Observable<any> {
    const URI = this._url + '/patient';
    return this.http.post(URI, patientData);
  }

  // myPrescriptions(patientData: any): Observable <any>  {
  //   const URI = this._url + '/prescriptions';
  //   return this.http.get(URI, patientData);
  // }

  getmyPrescriptions(userid): Observable <any>  {
    const URI = this._url + `/prescriptions/${userid}`;
    return this.http.get(URI).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getPatients() {
    return this.http.get(this._url + '/patients').pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public prescribe(patientData: any): Observable<any> {
    const URI = this._url + '/prescription';
    return this.http.post(URI, patientData);
  }

  // public login(userData: any): Observable<any> {
  //   const URI = this.uriseg + '/login';
  //   return this.http.post(URI, userData).pipe(map(token => {
  //     return this.saveToken(token);
  //   }));
  // }
  // public myPrescriptions(patientData: any){
  //   this.http.request(SearchEndpoint, new RequestOptions({
  //     method: RequestMethod.Get,
  //     body: q.BuildPayload()
  //   })).subscribe(...);
    
  // }
  newProduct(item)
  {
    return this.http.post("http://localhost:3000/insert",{"product" : item})
    .subscribe(data =>{
      console.log(data)
    })
  }
  //DELETE
  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/delete/${id}`)
    
  }

  //edit
  editProduct(id){
    return this.http.get(`http://localhost:3000/edit/${id}`);
  }

  //update
  updateProduct(item){
    return this.http.post("http://localhost:3000/update", {"product":item})
    .subscribe(data=>{console.log("updateservice" + data)})
  }
 
}