import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required!';
      return;
    }

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token, res.role);

        if (res.role.toLowerCase() === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/events']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password!';
      }
    });
  }
}