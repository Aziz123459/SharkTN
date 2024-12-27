import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  imports: [RouterModule, MatToolbarModule, MatButtonModule,RouterModule],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
  type=localStorage.getItem("acctype")
  id=localStorage.getItem("userId")
}
