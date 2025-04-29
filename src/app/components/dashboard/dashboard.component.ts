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
  showTrashed : boolean = false;
  activeItem: string = 'Notes'; //deafault Selected
  currentTitle: string = 'FunDoo';  // Default title


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
        this.showArchived = true; // Show archived notes , Archive tab is clicked
        this.showTrashed = false; // Hide trashed notes
      } 
      else if (item === 'Trash') {
         this.showTrashed = true; // Show trashed notes
         this.showArchived = false; // Hide archived notes
      }
      // else if (item === 'Note') {
      //      this.showTrashed = false; // Show trashed notes
      //      this.showArchived = false; // Hide archived notes
      //   }
      else{  
        this.showArchived = false; // Show regular notes when Notes tab is clicked
        this.showTrashed = false; // Hide trashed notes
      }
      this.currentTitle = item === 'Notes' ? 'FunDoo' : item;

      
   }
    
   


}
