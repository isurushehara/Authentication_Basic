import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  identifier = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) { }
  submit() {
    this.auth.login(this.identifier, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => alert(err.error?.message || 'Login failed')
    });
  }
}
