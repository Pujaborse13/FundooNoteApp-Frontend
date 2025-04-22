import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AddNoteComponent } from './add-note/add-note.component';



const routes: Routes = [

  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuardService],//property - true or false
    children: [{ path: '', component: AddNoteComponent },
      // Add more child routes as needed
    ]// after note container
    //archive, remainder adding here-- component name , Componant 
    
  },
  
  { path:'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
