import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import { AllNotesComponent } from './components/all-notes/all-notes.component';
//import { AllNotesComponent } from './components/all-notes/all-notes.component';



const routes: Routes = [
 
  { path:'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //Path is empty Redirects to login
 
  {path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuardService],//property - true or false
    children: [{ path: '', component: AllNotesComponent},]},  //loads AddNoteComponent
  { path:'display-notes', component: DisplayNotesComponent },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
