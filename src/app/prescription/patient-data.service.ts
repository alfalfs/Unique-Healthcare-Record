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
  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }
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

  // //SIGNUP AND LOGIN 
  // registerUser(user){
  //   return this.http.post(this._registerUrl , user)
  // }
  // loginUser(user){
  //   return this.http.post(this._loginUrl , user)
  // }
  // loggedIn()
  // {
  //   return !!localStorage.getItem('token')
  // }
}