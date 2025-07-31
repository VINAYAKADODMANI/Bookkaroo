import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface SlotData {
  id?: number;
  venueId?: string;
  slotdate: string;
  toDate: string;
  starttime: string;
  endtime: string;
  rate: number;
  duration: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5160/api/Slot';
  private apidlturl = 'http://localhost:5160/api/Slot/venues';


  constructor(private http: HttpClient) {}

  createSlot(slotData: SlotData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('Creating slot with data:', slotData);
    
    return this.http.post(this.apiUrl, slotData, { headers });
  }

  getSlots(): Observable<SlotData[]> {
    return this.http.get<SlotData[]>(this.apiUrl);
  }

  getSlot(id: number): Observable<SlotData> {
    return this.http.get<SlotData>(`${this.apiUrl}/${id}`);
  }

  updateSlot(id: number, slotData: SlotData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.put(`${this.apiUrl}/${id}`, slotData, { headers });
  }

  deleteSlot(id: string): Observable<any> {
    console.log("tsting",`${this.apidlturl}/${id}`);
    
    return this.http.delete(`${this.apidlturl}/${id}`);
    
  }

  deleteSlotTemp(venueid: string, slotdate: string, starttime: string): Observable<any> {
    const delterslottempurl = `http://localhost:5160/api/Slot/SlotTemp?venueid=${venueid}&slotdate=${encodeURIComponent(slotdate)}&starttime=${encodeURIComponent(starttime)}`;
    return this.http.delete(delterslottempurl);
  }
  


  checkDuplicateSlot(venueId: string, slotDate: string, startTime: string): Observable<{ exists: boolean }> {
    const chkDupSlot = `http://localhost:5160/api/Slot/check-duplicate?venueid=${venueId}&slotdate=${slotDate}&starttime=${startTime}`;
    console.log('Check duplicate URL:', chkDupSlot);
  
    return this.http.get<{ exists: boolean }>(chkDupSlot).pipe(
      catchError((error) => {
        console.error('Error in checkDuplicateSlot:', error);
        return throwError(() => error);
      })
    );
  }
   

  // this is for the slot-view page
  getSlotTempList(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5160/api/Slot/SlotTemp');
  }
  
  //this is for the user-booking page

  getSlotsForVenue(venueid: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5160/api/Slot/venues/${venueid}`);
  }
  

  //this is for the venue name from the mongodb
  // booking.service.ts
getVenues() {
  return this.http.get<any[]>('http://localhost:5228/api/Venue/'); // Replace with your actual backend URL
}


}