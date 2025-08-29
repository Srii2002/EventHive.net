import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { Ticket } from '../../models/ticket.model';
import { User } from '../../models/user.model';
import { EventService } from '../../services/event';
import { TicketService } from '../../services/ticket';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {
  events: Event[] = [];
  tickets: Ticket[] = [];
  users: User[] = [];
  loading = true;
  activeTab: string = 'events';

  constructor(
    private eventService: EventService,
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
    this.ticketService.getAllTickets().subscribe(tickets => this.tickets = tickets);
    this.userService.getAllUsers().subscribe(users => this.users = users);
    this.loading = false;
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  deleteEvent(eventId: number): void {
    if (confirm('Delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        this.events = this.events.filter(e => e.id !== eventId);
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      });
    }
  }
}