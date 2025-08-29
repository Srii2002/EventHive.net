import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-events',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = {
    description: '', date: '', location: '', ticketsAvailable: 0,
    id: 0
  };
  role: string | null = null;   // role can be 'admin' or 'user'
  loading = true;
  error = '';
 
  constructor(private eventService: EventService) {}
 
  ngOnInit(): void {
    this.role = localStorage.getItem('role'); // get role from login/session
    this.loadEvents();
  }
 
  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.error = 'Failed to load events';
        this.loading = false;
      }
    });
  }
 
  createEvent(): void {
  if (this.role === 'admin') {
    this.eventService.createEvent(this.newEvent).subscribe({
      next: (event) => {
        this.events.push(event);
        this.newEvent = { id: 0, description: '', date: '', location: '', ticketsAvailable: 0 };
      },
      error: (err) => console.error('Error creating event:', err)
    });
  }
}
 
  bookEvent(id: number): void {
    if (this.role === 'user') {
      console.log(`Booking event with id: ${id}`);
      // you can call booking API here
    }
  }
}
 