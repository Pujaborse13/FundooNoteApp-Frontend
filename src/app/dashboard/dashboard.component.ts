import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router){}




  isSidenavExpanded = true;

    toggleSidenav() {
      this.isSidenavExpanded = !this.isSidenavExpanded;
    }

    selectedItem: string = 'notes'; // default selected
      selectItem(item: string): void {
       this.selectedItem = item;
     }

     logout()
      {
        localStorage.removeItem('token');
        console.log("User logged out !");

        this.router.navigate(['/login']);
      }



}
