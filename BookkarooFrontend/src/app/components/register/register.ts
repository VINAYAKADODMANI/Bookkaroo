import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registermodel } from '../models/registermodel';
import { Userservice } from '../services/userservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule]
})
export class Register {
  registerForm: FormGroup;
  client = inject(HttpClient);
  rs = inject(Userservice);
  fb = inject(FormBuilder);
  router = inject(Router);
  // toastr=  inject(ToastrService)
      //public toastr: ToastrService
  
  o:Registermodel=new Registermodel();
  showPassword: boolean = false;

  constructor(
    public toastr: ToastrService

  ) {

    this.registerForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z0-9_]+$')
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
      ]]
    });
  }

  saveHandler() {
    if (this.registerForm.valid) {
      const registerData: Registermodel = this.registerForm.value;
      this.o.userName = this.registerForm.value.userName;
      this.o.email = this.registerForm.value.email;
      this.o.password = this.registerForm.value.password;

      // console.log('Registering user:', registerData.userName, registerData.email);
      
      // this.o = registerData;
      this.client.post<Registermodel>('http://localhost:5270/api/users', this.o)
        .subscribe({
          next: (data) => {
            this.toastr.success('Registration successful! Please log in.', 'Success');
            //alert('Registration Successful');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            //console.error('Registration failed:', error);
            this.toastr.error('Registration failed. Please try again.', 'Error');
            //alert('Registration failed. Please try again.');
          }
        });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get userName() { return this.registerForm.get('userName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
}