import { Component , inject, OnInit } from '@angular/core';
import { Venueservices } from '../services/venueservices';
import { Router, RouterLink } from '@angular/router';
import { Venue } from '../models/venue';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-owner-dashboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './owner-dashboard.html',
  styleUrl: './owner-dashboard.css'
})
export class OwnerDashboard  implements OnInit {
  venue: Array<Venue> = [];
  isLoggedIn: string = ''; // ✅ define it here
  username: string | null = null; // ✅ define it here
  private os = inject(Venueservices);
  private router = inject(Router);

  ngOnInit() {
    this.loadVenues();
    // this.username = localStorage.getItem('username');
    // this.isLoggedIn = localStorage.getItem('status') === 'loggedin';
  }
  
  

  loadVenues() {
    const username = localStorage.getItem('username'); // <-- Get current user

    this.os.getVenues().subscribe({
      next: (data) => {
        if (username) {
          // Filter venues for current owner
          this.venue = data.filter(v => v.ownerId === username);
        } else {
          console.warn('No username found in localStorage.');
          this.venue = [];
        }
      },
      error: (error) => {
        console.error('Load venues error:', error);
      }
    });
  }

  editVenue(id: string | undefined) {
    if (id) {
      this.router.navigate(['/edit-venue', id]);
    }
  }

  deleteVenue(id: string) {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.os.deleteVenue(id).subscribe({
        next: () => {
          this.loadVenues(); // Refresh after delete
        },
        error: (err) => {
          console.error('Delete error:', err);
        }
      });
    }
  }

  slotManagement(id: string | undefined) {
    if (id) {
      this.router.navigate(['slot-management', id]);
    }
  }
  trackById(index: number, item: Venue): string | undefined {
    return item.id;
}
}