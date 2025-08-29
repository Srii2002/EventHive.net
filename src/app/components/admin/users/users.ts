import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service'; // ✅ Add this line
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}