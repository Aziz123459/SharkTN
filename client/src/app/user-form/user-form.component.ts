import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-form',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  new: User = {}; 
  errorMessage: any = {};

  constructor(private apiService: ApiService, private router: Router) {}

  createUser(): void {
    this.apiService.createUser(this.new).subscribe({
      next: (res) => {
        const userType = res.user.acctype ; 
        localStorage.setItem("token", res.token)
        localStorage.setItem("userId", res.user._id)
        this.router.navigate(['/register', userType], {
          state: { userType: res } 
        });
      },
      error: (err) => {
        this.errorMessage = err;
        console.error(err);
      }
    });
  }
}
