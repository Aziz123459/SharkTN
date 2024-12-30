import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { Investor } from '../investor';
import { Startup } from '../startup';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { LoggedInFooterComponent } from '../logged-in-footer/logged-in-footer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatFormFieldModule,HomeNavbarComponent,RouterModule, LoggedInFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  type: 'investor' | 'startup' | null = null; 
  item: (Investor | Startup)[] = []; 
  investorData: Investor = {};
  startupData: Startup = {};
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
    } 
  }
  getone(): void {
    if (this.type === 'startup') {
      this.apiService.getinvestor(this.investorData._id).subscribe({
        next: (investorData: Investor) => (this.investorData = investorData),
        error: (err) => console.error('Error fetching investor:', err),
        complete: () => console.info('Fetched investor details')
      });
    } else if (this.type === 'investor') {
      this.apiService.getstartup(this.startupData._id).subscribe({
        next: (startupData: Startup) => (this.startupData = startupData),
        error: (err) => console.error('Error fetching startup:', err),
        complete: () => console.info('Fetched startup details')
      });
    }
  }
  
  onPostClick(id: string | undefined): void {
    this.router.navigate(['/display', this.type, id]);
  }
  
  

  

  
  isInvestor(entry: any): entry is Investor {
    return this.type === 'startup';
  }

  
  isStartup(entry: any): entry is Startup {
    return this.type === 'investor';
  }
}
