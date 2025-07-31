import { Component } from '@angular/core';
import { ForgotPasswordModel } from '../models/forgot-password-model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  model: ForgotPasswordModel = new ForgotPasswordModel();
  message: string = '';
  
  constructor(private http: HttpClient) {}

  sendResetLink() {
    this.http.post<any>('http://localhost:5270/api/Auth/ForgotPassword', this.model)
      .subscribe({
        next: (res) => this.message = res.message,
        error: (err) => this.message = err.error.message || "Something went wrong"
      });
    }
}
