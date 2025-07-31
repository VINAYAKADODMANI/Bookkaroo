import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.html',
  imports: [CommonModule,FormsModule],
})
export class UserBooking {
  venueId!: string;
  venueDetails: any;

  allSlots: any[] = [];
  slots: any[] = [];
  selectedSlots = new Set<string>();

  slotRate!: number;
  totalAmount = 0;
  selectedDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.venueId = this.route.snapshot.paramMap.get('id')!;
    this.loadSlots();
  }

  loadSlots(): void {
    this.bookingService.getSlotsForVenue(this.venueId).subscribe({
      next: (data) => {
        this.allSlots = data;
        console.log('Loaded slots:', this.allSlots);
      },
      error: () => console.error('Failed to load slots')
    });
  }

  onDateSelected(): void {
    if (!this.selectedDate) return;

    this.slots = this.allSlots.filter(slot => {
      const slotDate = new Date(slot.slotdate).toISOString().slice(0, 10);
      return slotDate === this.selectedDate;
    });

    this.slotRate = this.slots.length > 0 ? this.slots[0].rate : 0;
    this.selectedSlots.clear();
    this.totalAmount = 0;
  }

  toggleSlotSelection(slot: any): void {
    if (slot.customerid !== null) return;

    const key = slot.starttime;
    const newSelectedSlots = new Set(this.selectedSlots);

    if (newSelectedSlots.has(key)) {
      newSelectedSlots.delete(key);
    } else {
      newSelectedSlots.add(key);
    }

    this.selectedSlots = newSelectedSlots;
    this.totalAmount = this.selectedSlots.size * this.slotRate;
  }

  isSelected(slot: any): boolean {
    return this.selectedSlots.has(slot.starttime);
  }

  proceedToPayment(): void {
    if (this.selectedSlots.size === 0) return;

    const selectedSlotsArray = this.slots.filter(slot =>
      this.selectedSlots.has(slot.starttime)
    );

    const slotNos = selectedSlotsArray.map(s => s.slotno);

    this.router.navigate(['/payment', this.totalAmount], {
      state: {
        venue: this.venueDetails,
        selectedSlots: selectedSlotsArray,
        totalAmount: this.totalAmount,
        slotNos: slotNos
      }
    });
  }  
}










// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BookingService } from '../services/booking.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-user-booking',
//   imports: [CommonModule],
//   templateUrl: './user-booking.html',
//   styleUrl: './user-booking.css'
// })
// export class UserBooking   {
//   venueId!: string;
//   venueDetails: any;
//   showSlots = false;

//   slots: any[] = [];

//   // Use a Set to store selected slot starttimes (assuming unique)
//   selectedSlots = new Set<string>();

//   slotRate = 200;
//   totalAmount = 0;

//   constructor(
//     private route: ActivatedRoute,
//     private bookingService: BookingService,
//     private router: Router
//   ) {

//     this.venueId = this.route.snapshot.paramMap.get('id')!;
//     console.log("Venue ID:", this.venueId);
//     this.loadSlots();
//   }

//   // ngOnInit(): void {
//   //   //this.loadVenueDetails();
//   // }

//   // loadVenueDetails(): void {
//   //   this.venueDetails = {
//   //     id: this.venueId,
//   //     name: 'Royal Hall',
//   //     capacity: 150,
//   //     price: 200,
//   //     photoUrl: 'https://via.placeholder.com/400x200?text=Venue+Photo'
//   //   };
//   //   this.slotRate = this.venueDetails.price;
//   // }

//   loadSlots(): void {
//     this.bookingService.getSlotsForVenue(this.venueId).subscribe({
//       next: (data) => {
//         this.slots = data;
//         console.log('Loaded slots:', this.slots);
//       },
//       error: () => {
//         console.error('Failed to load slots');
//       }
//     });
//   }

//   onBookClick(): void {
//     this.showSlots = true;
//     console.log("book is clicked");
//   }
//   toggleSlotSelection(slot: any): void {
//     console.log('Toggling selection for slot:', slot);
  
//     // Just for debugging — logs all slot data, but DO NOT use "slot" in the loop!
//     for (const s of this.slots) {
//       console.log(`Slot starttime: ${s.starttime}, customerid: ${s.customerid}`);
//     }
  
//     // Prevent selection if slot is already booked
//     if (slot.customerid !== null) {
//       console.log(`Slot ${slot.starttime} is already booked.`);
//       return;
//     }
  
//     // Create a new Set to trigger Angular change detection
//     const newSelectedSlots = new Set(this.selectedSlots);
  
//     if (newSelectedSlots.has(slot.starttime)) {
//       newSelectedSlots.delete(slot.starttime);
//       console.log(`Deselected slot: ${slot.starttime}`);
//     } else {
//       newSelectedSlots.add(slot.starttime);
//       console.log(`Selected slot: ${slot.starttime}`);
//     }
  
//     // Assign the updated Set (new reference)
//     this.selectedSlots = newSelectedSlots;
  
//     // Recalculate total
//     this.totalAmount = this.selectedSlots.size * this.slotRate;
  
//     console.log('Currently selected slots:', Array.from(this.selectedSlots));
//   }
  
//   isSelected(slot: any): boolean {
//     const selected = this.selectedSlots.has(slot.starttime);
//     return selected;
//   }
  
  

//   proceedToPayment(): void {
//     if (this.selectedSlots.size === 0) return;

//     // Convert selectedSlots Set to array of slot objects by matching starttime from this.slots
//     const selectedSlotsArray = this.slots.filter(slot => this.selectedSlots.has(slot.starttime));
//     //this.bookingService.
//     this.router.navigate(['/payment',this.totalAmount], {
//       state: {
//         venue: this.venueDetails,
//         selectedSlots: selectedSlotsArray,
//         totalAmount: this.totalAmount
//       }
//     });
//   }
// }
