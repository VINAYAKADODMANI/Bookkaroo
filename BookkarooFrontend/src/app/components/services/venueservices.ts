import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from '../models/venue';
 

@Injectable({
  providedIn: 'root'
})
export class Venueservices {
  private client = inject(HttpClient);
 

  constructor() {}

  // Always get fresh venues list from API
  getVenues(): Observable<Array<Venue>> {
    return this.client.get<Array<Venue>>('http://localhost:5228/api/Venue');
  }

  addVenue(v: Venue): Observable<Venue> {
    return this.client.post<Venue>('http://localhost:5228/api/Venue', v);
  }

  getVenueById(id: string): Observable<Venue> {
    return this.client.get<Venue>(`http://localhost:5228/api/Venue/${id}`);
  }

  updateVenue(id: string, v: Venue): Observable<any> {
    return this.client.put(`http://localhost:5228/api/Venue/${id}`, v);
  }

  deleteVenue(id: string): Observable<any> {
    return this.client.delete(`http://localhost:5228/api/Venue/${id}`);
  }
}
