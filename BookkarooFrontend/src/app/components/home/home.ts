import { Component, inject, OnInit } from '@angular/core';
import { Venueservices } from '../services/venueservices';
import { ActivatedRoute, Router } from '@angular/router';
import { Venue } from '../models/venue';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  venue: Array<Venue> = [];
  filteredVenues: Array<Venue> = [];

  private os = inject(Venueservices);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  venueid! : string;

  ngOnInit() {
    this.loadVenues();

    this.route.queryParams.subscribe(params => {
      const searchTerm = (params['q'] || '').toLowerCase();
      this.filterVenues(searchTerm);
    });
  }

  // loadVenues() {
  //   this.os.getVenues().subscribe({
  //     next: (data) => {
  //       this.venue = data;
  //       this.filteredVenues = data; // initially show all
  //       if (this.venue.length > 0) {
  //         this.venueid = this.venue[0].id!;
  //       }
  //       this.venueid = this.venue[0].id!; // Assuming you want the first venue's ID
  //       console.log('Loaded venues:', this.venue[0].id);
  //     },
  //     error: (error) => {
  //      // this.toastr.error('Failed to load venues: ' + error.message, 'Error');
  //       console.error('Load venues error:', error);
  //     }
  //   });
  // }
  loadVenues() {
    this.os.getVenues().subscribe({
      next: (data) => {
        this.venue = data;
  
        // Apply filtering here AFTER venues are loaded
        const searchTerm = (this.route.snapshot.queryParamMap.get('q') || '').toLowerCase();
        this.filterVenues(searchTerm);
  
        if (this.venue.length > 0) {
          this.venueid = this.venue[0].id!;
        }
  
        console.log('Loaded venues:', this.venue[0].id);
      },
      error: (error) => {
        console.error('Load venues error:', error);
      }
    });
  }
  
  filterVenues(term: string) {
    if (!term) {
      this.filteredVenues = this.venue;
      return;
    }
    this.filteredVenues = this.venue.filter(v =>
      v.name.toLowerCase().includes(term) ||
      v.city.toLowerCase().includes(term) ||
      v.venueType.toLowerCase().includes(term)
    );
  }

  // editVenue(id: string | undefined) {
  //   alert(id)
  //   if (id) {
  //     this.router.navigate(['/edit-venue', id]);
  //   }
  // }

  // deleteVenue(id: string) {
  //   if (confirm('Are you sure you want to delete this venue?')) {
  //     this.os.deleteVenue(id).subscribe({
  //       next: () => {
  //       //  this.toastr.success('Venue deleted successfully', 'Success');
  //         this.loadVenues(); // refresh the list from backend after delete
  //       },
  //       error: (err) => {
  //       //  this.toastr.error('Failed to delete venue: ' + err.message, 'Error');
  //         console.error('Delete error:', err);
  //       }
  //     });
  //   }
  // }
  
  userBooking(id:string|undefined){  
    // alert(id)
    this.router.navigate(['/user-booking',id])
  }
}
