import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Load user directly from stored session; avoid unnecessary logout redirect.
    this.user = this.auth.getUser();
    if (!this.user && !this.auth.isLoggedIn()) {
      // Fallback: if guard somehow allowed through without token.
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
