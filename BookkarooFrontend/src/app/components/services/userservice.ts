import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Registermodel } from '../models/registermodel';
import { Register } from '../register/register';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Userservice {
  client= inject(HttpClient);
  registers:Array<Registermodel> = [];

  getUser(){
    console.log("Fetching users from API");
    return this.client.get<Array<Registermodel>>('http://localhost:5270/api/users');
  }

  updateUser(id: number, user: Registermodel) {
    return this.client.put<Registermodel>(`http://localhost:5270/api/users/${id}`, user);
  }
  // : Observable<Registermodel>

    // constructor(){
  //   this.client.get<Array<Registermodel>>('http://localhost:5270/api/users')
  //   .subscribe((data)=>{
  //     this.registers=data;
  //   });
  // }
  // getregisters():Array<Registermodel>{
  //   return this.registers;
  // }
  // addRegister(r:Registermodel){
  //   this.client.post<Registermodel>('http://localhost:5270/api/users',r)
  //   .subscribe({
  //       next:(data)=>{
  //         alert('one data added');
  //       this.registers.push(r)},
  //       error:(error)=>
  //         {alert(JSON.stringify(error))}
  //     })
  //   }
    // getOrderById(id:number):Register |undefined{
    //   return this.registers.find((o)=>o.UserID==id)
    // }
  
}
