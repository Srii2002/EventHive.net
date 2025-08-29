import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api/events';

  constructor(private http: HttpClient) {}

  // Fetch all events (used by both admin and user)
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  // Fetch a single event by ID
  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  // Create a new event (used by both admin and user depending on role)
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  // Add event (alias for createEvent, used by admin component)
  addEvent(event: Event): Observable<Event> {
    return this.createEvent(event); // reuse createEvent logic
  }

  // Update an event (used by admin)
  updateEvent(event: Event): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${event.id}`, event);
  }

  // Delete an event (used by admin)
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}