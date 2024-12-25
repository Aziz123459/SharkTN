import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Startup } from '../startup';
import { Investor } from '../investor';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../api.service';



@Component({
  selector: 'app-choice-form',
  imports: [CommonModule,FormsModule, MatCardModule, MatFormFieldModule],
  templateUrl: './choice-form.component.html',
  styleUrl: './choice-form.component.css'
})
export class ChoiceFormComponent {
  type: 'investor' | 'startup' | null = null;
  investorData: Investor = {};
  startupData: Startup = {};
  errorMessage: string | null = null;
  userId: string | null = null;

constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

ngOnInit(): void {
  this.type = this.route.snapshot.paramMap.get('type') as 'investor' | 'startup';
  this.userId= localStorage.getItem('userId');
}

submitInvestor(): void {
  if (this.investorData) {
    this.investorData.userId=this.userId
    this.apiService.creatInvestor(this.investorData).subscribe({
      next: (response) => {
        console.log('Investor created successfully:', response);
        this.router.navigate(['/home',this.type]);
        
      },
      error: (err) => {
        console.error('Error creating investor:', err);
        this.errorMessage = 'Failed to create investor. Please try again.';
      }
    });
  }
}

submitStartup(): void {
  
    if (this.startupData){
      this.investorData.userId=this.userId
      this.apiService.creatStartup(this.startupData).subscribe({
        next: (response) => {
          console.log('Startup created successfully:', response);
          this.router.navigate(['/home',this.type]);
        },
        error: (err) => {
          console.error('Error creating startup:', err);
          this.errorMessage = 'Failed to create startup. Please try again.';
        }
      });
    }
}

  selectedFileName: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    } else {
      this.selectedFileName = null;
    }
  }

}
