export interface Venue {
    id?: string; 
    ownerId?: string;
    name: string;
    description: string;
    address: string;
    city: string;
    capacity: number;
    amenities: string[];
    images: string[];
    venueType: string;
  }
  