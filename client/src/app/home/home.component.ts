import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Investor } from '../investor';
import { Startup } from '../startup';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  type: 'investor' | 'startup' | null = null; 
  item: (Investor | Startup)[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    
    this.type = this.route.snapshot.paramMap.get('type') as 'investor' | 'startup';

    
    this.getall();
  }

  getall(): void {
    if (this.type === 'startup') {
      
      this.apiService.getinvestors().subscribe({
        next: (data: Investor[]) => (this.item = data),
        error: (err) => console.error('Error fetching investors:', err),
        complete: () => console.info('Fetched all investors')
      });
    } else if (this.type === 'investor') {
      
      this.apiService.getstartups().subscribe({
        next: (data: Startup[]) => (this.item = data),
        error: (err) => console.error('Error fetching startups:', err),
        complete: () => console.info('Fetched all startups')
      });
    } else {
      console.warn('Invalid type. Unable to fetch data.');
    }
  }

  
  isInvestor(entry: any): entry is Investor {
    return this.type === 'startup';
  }

  
  isStartup(entry: any): entry is Startup {
    return this.type === 'investor';
  }
}
