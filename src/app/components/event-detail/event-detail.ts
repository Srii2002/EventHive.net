import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-event-detail',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss']
})
export class EventDetailComponent implements OnInit {
  event?: Event;
  loading = true;
  error = '';
 
  constructor(private route: ActivatedRoute, private eventService: EventService) {}
 
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.eventService.getEvent(id).subscribe({
        next: (data) => {
          this.event = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching event:', err);
          this.error = 'Event not found';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid event ID';
      this.loading = false;
    }
  }
}