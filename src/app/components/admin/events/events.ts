import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/event.model';
import { EventService } from '../../../services/event';

@Component({
  selector: 'app-admin-events',
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class AdminEventsComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = { id: 0, name: '', date: '', location: '', price: 0 };
  editingEvent: Event | null = null;
  loading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addEvent(): void {
   this.eventService.createEvent(this.newEvent).subscribe(() => {
  this.loadEvents();
  this.newEvent = { id: 0, name: '', date: '', location: '', price: 0 };
});
    
  }

  editEvent(event: Event): void {
    this.editingEvent = { ...event };
  }

  updateEvent(): void {
    if (this.editingEvent) {
      this.eventService.updateEvent(this.editingEvent).subscribe(() => {
        this.loadEvents();
        this.editingEvent = null;
      });
    }
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }
}