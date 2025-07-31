import { Component, inject } from '@angular/core';
import { Venueservices } from '../services/venueservices';
import { ActivatedRoute, Router } from '@angular/router';
import { Venue } from '../models/venue';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-venue',
  imports: [FormsModule],
  templateUrl: './delete-venue.html',
  styleUrl: './delete-venue.css'
})
export class DeleteVenue {
  private vs = inject(Venueservices);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  venue: Venue | null = null;
  confirmName: string = '';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vs.getVenueById(id).subscribe({
        next: (data) => (this.venue = data),
       // error: () =>this.toastr.error('Venue not found', 'Error')
       error:() => {console.error('Venue not found');}
      });
    }
  }

  deleteVenue() {
  if (!this.venue) return;
  if (this.confirmName !== this.venue.name) {
    this.toastr.warning('Venue name does not match', 'Validation Error');
    //alert("Venue name does not match");
    return;
  }
    this.vs.deleteVenue(this.venue.id!).subscribe({
      next: () => {
        this.toastr.success('Venue deleted successfully', 'Success');
        //alert('Venue deleted successfully');
        setTimeout(() => {this.router.navigate(['/show-venue']);}, 1000);
      },
      error: (error) => {
        this.toastr.error('Failed to delete: ' + error.message, 'Error');
        //alert('Failed to delete: ' + error.message);
        console.error(error);
      }
    });
  }

  cancel() {
    setTimeout(() => {
    this.router.navigate(['/show-venue']);}, 1000);
  }

}
