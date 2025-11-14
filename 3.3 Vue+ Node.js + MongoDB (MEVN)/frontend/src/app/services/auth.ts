import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const API = 'http://localhost:5000/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${API}/register`, { username, email, password }).pipe(
      tap((res: any) => {
        if (res.token) this.setSession(res.token, res.user);
      })
    );
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${API}/login`, { identifier, password }).pipe(
      tap((res: any) => {
        if (res.token) this.setSession(res.token, res.user);
      })
    );
  }

  private setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() { return localStorage.getItem('token'); }
  isLoggedIn() { return !!this.getToken(); }

  getUser() {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
