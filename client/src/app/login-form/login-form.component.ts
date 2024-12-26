import { Component } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-form',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  new: User ={}
  errorMessage: any = {}
  
    constructor(private apiService: ApiService, private router: Router) {}
  
    login(): void {
      this.apiService.login(this.new).subscribe({
        next: (res) => {
          const userType = res.user.acctype 
          localStorage.setItem("token", res.token)
          localStorage.setItem("userId", res.user._id)
          localStorage.setItem("acctype", res.user.acctype)
          
          this.router.navigate(['/home',userType],{
            state: { userType:userType } 
          });
        },
        
        error: (err) =>{this.errorMessage = err
          console.error(err);
        } 
      })
    }
  

}
