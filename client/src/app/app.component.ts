import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from "./user-form/user-form.component";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LandingPageComponent, FooterComponent, UserFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}