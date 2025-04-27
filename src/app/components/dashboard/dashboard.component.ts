import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router){}

  isSidenavExpanded = true;
  showArchived : boolean = false;
  activeItem: string = 'Notes'; //deafault Selected

    toggleSidenav() {
      this.isSidenavExpanded = !this.isSidenavExpanded;
    }


    // selectedItem: string = 'notes';     
    //  selectItem(item: string): void {
    //    this.selectedItem = item;
    //  }


     //logout user / remove token
     logout()
      {
        localStorage.removeItem('token');
        console.log("User logged out !");

        this.router.navigate(['/login']);
      }

       

      // Set active tab and toggle archived notes display
   setActive(item: string) 
   {
     this.activeItem = item;
     if (item === 'Archive') {
       this.showArchived = true; // Show archived notes when Archive tab is clicked
     
      } else if (item === 'Notes') {
       this.showArchived = false; // Show regular notes when Notes tab is clicked
     }
   }
    


}
