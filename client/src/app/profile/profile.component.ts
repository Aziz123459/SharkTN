import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Startup } from '../startup';


@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user : User ={}
  dataStartup : Startup ={}
  userId: string | null = null;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId= localStorage.getItem('userId');
    console.log(this.userId);
    
    if (this.userId) {
      this.apiService.getuser(this.userId).subscribe({
        next: (data) => this.user = data,
        error: err => console.error("Error fetching user:", err)
      })
    
      this.apiService.getstartupByUserId(this.userId).subscribe({
        next: (data) => {this.dataStartup = data[0]; console.log(data);
        },
        error: err => console.error("Error fetching startup:", err)
      })
    }
  }
}
