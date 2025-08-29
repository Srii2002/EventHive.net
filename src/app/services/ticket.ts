import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:5000/api/tickets';

  constructor(private http: HttpClient) {}

  // ✅ Get tickets for current user
  getMyTickets(): Observable<Ticket[]> {
    const userId = Number(localStorage.getItem('userId'));
    return this.getTicketsByUser(userId);
  }

  // ✅ Get tickets by user ID (used internally or by admin)
  getTicketsByUser(userId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/user/${userId}`);
  }

  // ✅ Purchase ticket (used by user)
  purchaseTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  // ✅ Cancel ticket (used by admin or user)
  cancelTicket(ticketId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ticketId}`);
  }

  // ✅ Get all tickets (used by admin)
  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }
}