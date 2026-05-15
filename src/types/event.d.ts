export interface IEvent {
  _id?: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  banner?: FileList | string;
  isFeatured: boolean;
  isOnline: boolean;
  isPublish: boolean;
  category: string;
  location: {
    region: number;
    coordinates: [number, number];
  };
}
