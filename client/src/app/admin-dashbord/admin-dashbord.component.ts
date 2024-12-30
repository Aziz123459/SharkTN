import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";

@Component({
  selector: 'app-admin-dashbord',
  imports: [MatTableModule, CommonModule, HomeNavbarComponent],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'accType', 'actions']; 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getusers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  deleteUser(_id: string|undefined): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(_id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user._id !== _id);
          alert('User deleted successfully');
        },
        error: (err) => console.error('Error deleting user:', err),
      });
    }
  }
}
