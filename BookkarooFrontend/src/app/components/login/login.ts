import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { loginmodel } from '../models/loginmodel';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // username: string = '';
  // password: string = '';
  loginData: loginmodel = new loginmodel();
  showPassword: boolean = false;
  private toastr = inject(ToastrService);

  constructor(private http: HttpClient, private router:Router,) {
    
  }
  saveHandler() {
    this.router.navigate(['/forgot-password']);
  }

  login() {
    console.log("Login data:", this.loginData);
    this.http.post<any>('http://localhost:5270/api/Auth/login', this.loginData)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            localStorage.setItem('token', res.token);
            localStorage.setItem('status', 'loggedin');
            localStorage.setItem('username', this.loginData.email);

            // alert('Login successful.' );
            setTimeout(() => {this.router.navigate(['/Owner-Dashboard'])
              
            }, 500);
          } else {
          this.toastr.error('Login failed. Please check your credentials.', 'Error');
            //alert('Login failed.');
          }
        },
        error: () => {
          this.toastr.error('Invalid credentials. Try again', 'Error');
          //alert('Invalid credentials. Try again');
        }
      });
    }
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  // saveHandler(){
  //   alert('login');
  // }
  //+ res.token
  // Optionally store the token in localStorage
  // localStorage.setItem('token', res.token);
  }
