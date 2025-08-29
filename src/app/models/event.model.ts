export interface Event {
  id: number;
  name?: string;
  description?: string;
  date: string;
  location: string;
  price?: number;
  ticketsAvailable?: number;
}