import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  type: 'investor' | 'startup' | null = null;

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') as 'investor' | 'startup';
  }

  data:any
  item:any
  constructor(private route: ActivatedRoute,private router:Router ,private apiService:ApiService){
    const navigation=this.router.getCurrentNavigation()
    this.data=navigation?.extras?.state?.['data'] || {}
  }
  getall():void{
    this.apiService.getstartups().subscribe({
      next: (data)=>this.item=data,
      error:(err)=>console.error(err),
      complete:()=>console.info('complete')
    })
  }
}
