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
  selectedFile: File[] = [];

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
onFileSelected(event: any,idx : number): void {
  this.selectedFile[idx] = event.target.files[0];
}

submitStartup(): void {
    if (this.startupData){
      this.startupData = {...this.startupData,StartupLogo:this.selectedFile[0].name,UploadGovernmentIssuedID:this.selectedFile[1].name,UploadBusinessRegistrationCertificate:this.selectedFile[2].name}
      this.startupData.userId=this.userId
      this.apiService.creatStartup(this.startupData).subscribe({
        next: (response) => {
          if (this.selectedFile.length > 0) {
            this.selectedFile.forEach((file) => {
              this.apiService.uploadImage(file).subscribe({
                next: (res) => console.log('Image uploaded successfully:', res),
                error: (err) => console.error('Error uploading image:', err),
              });
            });
          }
          console.log("posted")
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

}
