import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Venueservices } from '../services/venueservices';
import { ActivatedRoute } from '@angular/router';
import { Venue } from '../models/venue';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-venue',
  imports: [FormsModule],
  templateUrl: './edit-venue.html',
  styleUrl: './edit-venue.css'
})
export class EditVenue {
  private route = inject(ActivatedRoute);
  private vs = inject(Venueservices);
  private router = inject(Router);
  //private toastr = inject(ToastrService);

  venue: Venue = {
    id: '',
    ownerId: '',
    name: '',
    description: '',
    address: '',
    city: '',
    capacity: 0,
    amenities: [],
    images: [],
    venueType: ''
  };

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vs.getVenueById(id).subscribe((data) => {
        this.venue = data;
      });
    }
  }

  updateHandler() {
    if (this.venue.id) {
      this.vs.updateVenue(this.venue.id, this.venue).subscribe({
        next: () => {
          //this.toastr.success('Venue updated successfully');
          setTimeout(() => {
          this.router.navigate(['/show-venues']);}, 1000);
        },
        error: (error) => {
          //this.toastr.error('Failed to update venue: ' + JSON.stringify(error));
          console.error('Update error:', error);
        }
      });
    }
  }
  deleteHandler() {
    if (this.venue.id && confirm('Are you sure you want to delete this venue?')) {
      this.vs.deleteVenue(this.venue.id).subscribe({
        next: () => {
          //this.toastr.success('Venue deleted successfully');
          setTimeout(() => {
            this.router.navigate(['/show-venues']);
          }, 1000);
        },
        error: (error) => {
          //this.toastr.error('Failed to delete venue: ' + JSON.stringify(error));
          console.error('Delete error:', error);
        }
      });
    }
  }
}
