import { DateValue } from "@internationalized/date";

export interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  banner?: FileList | string;
  isFeatured?: boolean | string;
  isOnline?: boolean | string;
  isPublish?: boolean | string;
  category?: string;
  location?: {
    address: string;
    region: string;
    coordinates: number[];
  };
}

export interface IEventForm extends IEvent {
  address?: string;
  region?: string;
  startDate?: DateValue;
  endDate?: DateValue;
  latitude?: string;
  longitude?: string;
}

export interface IRegion {
  id: string;
  name: string;
}
