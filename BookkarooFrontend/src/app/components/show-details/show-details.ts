import { Component, inject } from '@angular/core';
import { Registermodel } from '../models/registermodel';
import { Userservice } from '../services/userservice';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-show-details',
  standalone:true,
  imports: [HttpClientModule, CommonModule, FormsModule,DatePipe],
  templateUrl: './show-details.html',
  styleUrl: './show-details.css'
})

export class ShowDetails {
  details: Registermodel[] = [];
  editingUser: Registermodel | null = null;
  os = inject(Userservice);
  constructor() {}
    ngOnInit():void {
    this.os.getUser()
    // ('http://localhost:5270/api/User')
      .subscribe({
        next: (data) => {
          this.details = data;
          console.log("Fetched orders:", this.details);
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        }
      });
    }
    editUser(user: Registermodel) {
      this.editingUser = user; // You can use {...user} for deep copy if needed
    }
    cancelEdit() {
      this.editingUser = null;
    }
    saveChanges(user: Registermodel) {
      if (user.userID == null) {
        console.error('User ID is missing, cannot update.');
        return;
      }
      this.os.updateUser(user.userID, user).subscribe({
        next: (updatedUser) => {
          console.log('User updated successfully:', updatedUser);
          user.updatedDate = new Date();
          this.editingUser = null;
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    }
  }
 
  // registers:Array<Registermodel>=[]
  // client=inject(Userservice);
  // isEdit:boolean=false;
  // trackByUserId(index: number, item: Registermodel): number {
  //   return item.UserID ?? index;
  // constructor() {
  //   this.client.getregisters().subscribe(data => {
  //     this.registers = data;  // Assign fetched data to registers array
  //   });
  // }
  //   constructor(){
  //   let l= new Registermodel();
  //   l.UserName= "ankita";
  //   l.email="ankita@email.com";
  //   l.password="password123";
  //   l.isOwner="true";
  //   this.registers.push(l);
  // }

 