import { Component } from '@angular/core';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-display',
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
type: 'investor' | 'startup' | undefined;
  id: string | undefined |null;
  investorData: Investor = {} as Investor;
  startupData: Startup = {} as Startup;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as 'investor' | 'startup';
    this.id= this.route.snapshot.paramMap.get('id');

    if (this.type && this.id) {
      this.fetchDetails();
    }
  }

  fetchDetails(): void {
    if (this.type === 'startup') {
      // investor details
      this.apiService.getinvestor(this.id).subscribe({
        next: (data: Investor) => (this.investorData = data),
        error: (err) => console.error('Error fetching investor details:', err)
      });
    } else if (this.type === 'investor') {
      // startup details
      this.apiService.getstartup(this.id).subscribe({
        next: (data: Startup) => (this.startupData = data),
        error: (err) => console.error('Error fetching startup details:', err)
      });
    }
  }
  
}
