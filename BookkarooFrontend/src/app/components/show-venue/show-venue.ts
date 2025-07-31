import { Component, inject, OnInit } from '@angular/core';
import { Venue } from '../models/venue';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Venueservices } from '../services/venueservices';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-venue',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './show-venue.html',
  styleUrl: './show-venue.css'
})
export class ShowVenue implements OnInit {
  venue: Array<Venue> = [];
  private os = inject(Venueservices);
  private router = inject(Router);
  

  ngOnInit() {
    this.loadVenues();
  }

  loadVenues() {
    this.os.getVenues().subscribe({
      next: (data) => {
        this.venue = data;
      },
      error: (error) => {
       // this.toastr.error('Failed to load venues: ' + error.message, 'Error');
        console.error('Load venues error:', error);
      }
    });
  }

  editVenue(id: string | undefined) {
   // alert(id)
    if (id) {
      this.router.navigate(['/edit-venue', id]);
    }
  }

  deleteVenue(id: string) {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.os.deleteVenue(id).subscribe({
        next: () => {
        //  this.toastr.success('Venue deleted successfully', 'Success');
          this.loadVenues(); // refresh the list from backend after delete
        },
        error: (err) => {
        //  this.toastr.error('Failed to delete venue: ' + err.message, 'Error');
          console.error('Delete error:', err);
        }
      });
    }
  }
  slotManagement(id:string|undefined){  
//    alert(id)
    this.router.navigate(['slot-management',id])
  }
}
