// src/app/pages/signup/signup.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    this.user = {
      username: String(formData.get('username') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? '')
    };

    this.auth.register(this.user.username, this.user.email, this.user.password).subscribe({
      next: (_res: any) => {
        // Immediately attempt auto-login so dashboard can load user profile
        this.message = 'Signup successful! Logging you in...';
        this.auth.login(this.user.username || this.user.email, this.user.password).subscribe({
          next: () => {
            this.message = 'Signup & login successful! Redirecting to dashboard...';
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.message = 'Signup done. Auto-login failed, please login manually.';
            setTimeout(() => this.router.navigate(['/dashboard']), 2000);
          }
        });
      },
      error: (err: any) => {
        console.error(err);
        this.message = err?.error?.message || 'Signup failed!';
      }
    });
  }
}
