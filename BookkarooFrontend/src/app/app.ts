import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ShowDetails } from './components/show-details/show-details';
import { NgForm } from '@angular/forms';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar, Home, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookaro');
  constructor(){
    }
   
  
}
