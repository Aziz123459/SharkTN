import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  users : User[] =[]

  constructor (private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getusers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err),
      complete: () => console.info('complete')
    })
  }
}
