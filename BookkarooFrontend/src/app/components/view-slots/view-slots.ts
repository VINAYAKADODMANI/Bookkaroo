import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-slots',
  imports: [CommonModule],
  templateUrl: './view-slots.html',
  styleUrl: './view-slots.css'
})
export class ViewSlots {

  slotTemps: any[] = [];
  venues: any[] = [];
  venueMap: Map<string, string> = new Map();
  isLoading = false;
  private toastr = inject(ToastrService);

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchVenues();        // Fetch venues first
    this.fetchSlotTempList();  // Then fetch slot temps
  }

  fetchVenues(): void {
    this.bookingService.getVenues().subscribe({
      next: (venues) => {
        this.venues = venues;
        // Create a map of venueId to venueName for quick lookup
        venues.forEach(v => this.venueMap.set(v.id, v.name));
      },
      error: () => {
        //alert("Failed to fetch venues");
        this.toastr.error('Failed to fetch venues', 'Error');
      }
    });
  }

  fetchSlotTempList(): void {
    this.isLoading = true;
    this.bookingService.getSlotTempList().subscribe({
      next: (list) => {
        this.slotTemps = list;
        this.isLoading = false;
      },
      error: () => {
        //alert("Failed to fetch SlotTemp list");
        this.toastr.error('Failed to fetch Slot list', 'Error');
        this.isLoading = false;
      }
    });
  }

  getVenueNameById(venueId: string): string {
    return this.venueMap.get(venueId) || 'Unknown Venue';
  }

  
  deleteTempSlot(entry: any): void {
    const { venueid, slotdate, starttime } = entry;
  
  
    this.bookingService.deleteSlot(venueid).subscribe({
      
      next: () => {
        
        //this.toastr.warning('Slot deleted', 'Deleted');
        //alert("Slot deleted");
        this.toastr.success('Slot deleted', 'Deleted');
  
        this.bookingService.deleteSlotTemp(venueid, slotdate, starttime).subscribe({
          next: () => {
           // this.toastr.success('SlotTemp also deleted', 'Deleted');
           
            this.slotTemps = this.slotTemps.filter(s =>
              !(s.venueid === venueid && s.slotdate === slotdate && s.starttime === starttime)
            );
          },
          error: () => {
            
            //this.toastr.error('Failed to delete SlotTemp', 'Error');
            //alert("Failed to delete SlotTemp");
            this.toastr.error('Failed to delete SlotTemp', 'Error');
            
          }
        });
      },
      error: () => {
        //this.toastr.error('Failed to delete Slot', 'Error');
        //alert("Failed to delete Slot");
        this.toastr.error('Failed to delete Slot', 'Error');
      }
    });
  }
  
  
}


