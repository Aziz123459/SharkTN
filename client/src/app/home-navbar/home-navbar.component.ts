import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home-navbar',
  imports: [RouterModule, MatToolbarModule, MatButtonModule,RouterModule],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
  type = localStorage.getItem("acctype");
  id = localStorage.getItem("userId");

  constructor(private apiService: ApiService, private router: Router) {}

  onLogout(): void {
    this.apiService.logoutUser().subscribe({
      next: () => {
        console.log('User logged out successfully');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('acctype');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
      }
    });
  }
}

