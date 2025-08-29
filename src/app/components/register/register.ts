import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMessage = 'Registration failed. Try again!';
      }
    });
  }
}