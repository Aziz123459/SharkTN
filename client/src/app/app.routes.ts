import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { ChoiceFormComponent } from './choice-form/choice-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:"register",component:UserFormComponent},
    {path:"register/:type",component:ChoiceFormComponent},
    {path:"login",component:LoginFormComponent},
    {path:"",component:LandingPageComponent},
    {path:"home/:type",component:HomeComponent},
    {path:"profile",component:ProfileComponent},
    {path:"profile/:id",component:ProfileComponent},
    { path: '*', redirectTo: '/register', pathMatch: 'full' }
];

// logo          Home Favourits Profile