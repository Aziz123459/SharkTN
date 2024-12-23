import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Startup } from '../startup';
import { Investor } from '../investor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choice-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './choice-form.component.html',
  styleUrl: './choice-form.component.css'
})
export class ChoiceFormComponent {
  type: 'investor' | 'startup' | null = null;
  investorData: Investor = {};
  startupData: Startup = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as 'investor' | 'startup';

    const navigation = this.router.getCurrentNavigation();
    const stateData = navigation?.extras.state?.['userType'];

    if (this.type === 'investor') {
      this.investorData = stateData as Investor;
    } else if (this.type === 'startup') {
      this.startupData = stateData as Startup;
    } else {
      console.error('Invalid type');
      this.router.navigate(['/error']); 
    }
  }

  submitInvestor(): void {
    if (this.investorData) {
      console.log('Submitting investor data:', this.investorData);
    }
  }

  submitStartup(): void {
    if (this.startupData) {
      console.log('Submitting startup data:', this.startupData);
    }
  }


}
