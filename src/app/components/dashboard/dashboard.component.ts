import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { MatDialog } from '@angular/material/dialog';
import { LabelService } from 'src/app/services/label/label.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  labels: any[] = [];

  constructor(private router: Router, 
              private noteService : NoteService,
              private dialog: MatDialog,
              private labelService: LabelService,
              private snackBar: MatSnackBar,){}


  isSidenavExpanded = true;
  activeItem: string = 'Notes'; //deafault Selected
  currentTitle: string = 'FunDoo';  // Default title
  
  showArchived : boolean = false;
  showTrashed : boolean = false;
  showReminder: boolean = false;
  isListView: boolean = false;
  selectedLabel: string | null = null;
  


      toggleSidenav() 
      {
        this.isSidenavExpanded = !this.isSidenavExpanded;
      }

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
        this.showReminder = false; // Hide reminder notes
      } 
      else if (item === 'Trash') {
         this.showTrashed = true; // Show trashed notes
         this.showArchived = false; // Hide archived notes
         this.showReminder = false; // Hide reminder notes
      }
      else if (item === 'Reminder') {
          this.showReminder = true;
           this.showTrashed = false; // hide trashed notes
           this.showArchived = false; // Hide archived notes
        }
        else if (this.labels.some(label => label.labelName === item)) {
          this.showArchived = false;
          this.showTrashed = false;
          this.showReminder = false;
          this.currentTitle = item;
        }

      else{  
        this.showArchived = false; // Show regular notes when Notes tab is clicked
        this.showTrashed = false; // Hide trashed notes
        this.showReminder = false;//hide reminder

      }
      this.currentTitle = item === 'Notes' ? 'FunDoo' : item;

      
   }

   isSpinning: boolean = false;
   currentRefreshIcon: string = 'refresh';
    triggerRefreshAnimation(): void 
    {
      this.isSpinning = true;
      this.currentRefreshIcon = 'refresh';

      // Start spinning
      setTimeout(() => {
        // Switch to cloud icon briefly
        this.isSpinning = false;
        this.currentRefreshIcon = 'cloud_sync';

        setTimeout(() => {
          // Switch back to refresh icon
          this.currentRefreshIcon = 'refresh';
        }, 2000); //cloud

      }, 3000); // Spinning 
    }


    toggleViewMode(): void {
      this.isListView = !this.isListView;
    }


    
    openEditLabelDialog() {
      const dialogRef = this.dialog.open(EditLabelComponent, {
        width: '400px',
        disableClose: true
      });
      
      dialogRef.componentInstance.labelsChanged.subscribe(() => {
        this.loadLabels();  // Refresh sidenav labels
      });
    }



    ngOnInit() {
      this.loadLabels();
    }

    loadLabels() 
    {
      this.labelService.GetLabelByUserId().subscribe({
      next: (res: any) => {
      this.labels = res?.data || [];
    },
      error: (err) => {
      console.error('Failed to load labels', err);
       }
    });
  }


  
   
}
