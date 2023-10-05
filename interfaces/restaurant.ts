import { Cuisine,Location,PRICE, Review } from '@prisma/client';

export interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

export interface RestaurantFull {
  id:          number;
  name:        string;
  main_image:  string;
  images:      string[];
  description: string;
  open_time:   string;
  close_time:  string;
  slug:        string;
  price:       string;
  location_id: number;
  cuisine_id:  number;
  created_at:  Date;
  updated_at:  Date;
}



export interface RestaurantCardType {
  id:          number;
  name:        string;
  main_image:  string;
  price:       PRICE;
  location:    Location;
  cuisine:     Cuisine;
  slug:        string;
  reviews:     Review[]
}
