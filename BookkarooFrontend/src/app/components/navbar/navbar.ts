import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { NewVenue } from '../new-venue/new-venue';
import { ShowVenue } from '../show-venue/show-venue';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  lc = localStorage;
  searchTerm: string = '';

  constructor(private router: Router){}
  navigateToHome() {
    this.router.navigate(['/home']);
  }
 
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToShowDetails() {
    this.router.navigate(['/show-details']);
  }
  navigateToAbout(){
    this.router.navigate(['/about']);
  }
  logoutHandler(){
    localStorage.removeItem('username')
    localStorage.setItem('status','loggedout');
    this.router.navigate(['/login']);
  }
  performSearch() {
    const trimmedTerm = this.searchTerm.trim();
    if (trimmedTerm) {
      this.router.navigate(['/home'], { queryParams: { q: trimmedTerm } });
    } else {
      this.router.navigate(['/home']);
    }
  }
  
}
