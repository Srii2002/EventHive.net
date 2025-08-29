import { Component, OnInit } from '@angular/core';

import { TicketService } from '../../../services/ticket';
import { Ticket } from '../../../models/ticket.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-tickets',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.scss']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  errorMessage = '';
 
  constructor(private ticketService: TicketService) {}
 
  ngOnInit(): void {
    this.fetchTickets();
  }
 
  fetchTickets(): void {
    this.ticketService.getMyTickets().subscribe({
      next: (res) => {
        this.tickets = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load your tickets.';
        this.loading = false;
      }
    });
  }
 
  cancelTicket(id: number): void {
    if (confirm('Are you sure you want to cancel this ticket?')) {
      this.ticketService.cancelTicket(id).subscribe({
        next: () => {
          this.tickets = this.tickets.filter(t => t.ticketId !== id);
        },
        error: () => {
          alert('Error cancelling ticket. Try again.');
        }
      });
    }
  }
}