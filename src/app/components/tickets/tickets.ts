import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.scss']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  error = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getMyTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tickets:', err);
        this.error = 'Failed to load tickets';
        this.loading = false;
      }
    });
  }
}