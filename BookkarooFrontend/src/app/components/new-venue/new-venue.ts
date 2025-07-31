import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Venue } from '../models/venue';
import { Venueservices } from '../services/venueservices';
 
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-venue',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './new-venue.html',
  styleUrl: './new-venue.css'
})
export class NewVenue {
  ns = inject(Venueservices);
  ownerId?:string;
  
  private router = inject(Router);

  v = {
    name: '',
    ownerId: this.ownerId, // Set ownerId from localStorage
    description: '',
    address: '',
    city: '',
    capacity: 0,
    amenitiesInput: '',
    imageUrlsInput: '',
    venueType: ''
  };

  saveHandler() {
    
    this.ownerId = localStorage.getItem('username') || '';
    const venueToSave: Venue = {
      name: this.v.name,
      ownerId: this.ownerId , // Ensure ownerId is set
      description: this.v.description,
      address: this.v.address,
      city: this.v.city,
      capacity: this.v.capacity,
      amenities: this.v.amenitiesInput.split(',').map(a => a.trim()),
      images: this.v.imageUrlsInput.split(',').map(url => url.trim()),
      venueType: this.v.venueType // Include in object
    };
    //console.log("venue type::",this.v.venueType);
    this.ns.addVenue(venueToSave).subscribe({
      next: () => {
         

        // Optional: Navigate to show-venue page
        this.router.navigate(['/show-venues']);

        // Optional: Reset the form fields
        this.v = {
          name: '',
          ownerId: this.ownerId , // Reset ownerId
          description: '',
          address: '',
          city: '',
          capacity: 0,
          amenitiesInput: '',
          imageUrlsInput: '',
          venueType: ''
        };
      },
      error: (error) => {
     
        console.error('Add venue error:', error);
      }
    });
  }
}
