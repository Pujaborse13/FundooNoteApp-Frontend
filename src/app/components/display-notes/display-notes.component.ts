import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';

interface Note {
  noteId: number
  title: string;
  description: string;
  color:string;
  showColorPicker :boolean;
  isArchive: boolean;
  isTrash : boolean;
}

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})

export class DisplayNotesComponent implements OnInit,OnChanges{

  allNotes: Note[] = []; 

  isColorPickerVisible: boolean = false;

  //recived value from parent
  @Input() showArchived : boolean= false //Input property to determine whether to archived or non-archived notes
  
  @Input() showTrashed : boolean = false

  colors: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  constructor(private noteService: NoteService , 
              private snackBar :MatSnackBar, 
              private route: ActivatedRoute) {}

  ngOnInit() {
   this.getNotes(); //display notes while loading 
    }
    
    ngOnChanges() {
      // When showArchived changes, reload the notes
      this.getNotes();
    }
      
  
  // getNotes()
  // {
  //   this.noteService.getAllNotes().subscribe({
  //     next: (res: any) => {

  //       console.log("API response:", res);
  //       this.allNotes = res.data ;

  //       if(this.showArchived)
  //       {
  //         this.allNotes= this.allNotes.filter((note : Note ) => note.isArchive && !note.isTrash);
          

  //       }
  //       else if(this.showTrashed)
  //       {
  //         this.allNotes = this.allNotes.filter((note : Note ) => note.isTrash);
  //       }
  //       else
  //       {
  //         this.allNotes = this.allNotes.filter((note: Note) => !note.isArchive && !note.isTrash); // Show regular notes
  //        // Filter notes based on the showArchived property
  //         //this.allNotes = this.allNotes.filter((note: Note) => this.showArchived ? note.isArchive : !note.isArchive);
  //       }

  //     },

  //     error: (err) => {
  //       this.snackBar.open(' Error fetching notes !', 'Close', {duration: 3000});
  //       //console.error("Error fetching notes", err);
  //     }
  //   });

  // }
  
  getNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (res: any) => {
        console.log("API response:", res);
  
        let notes = res.data; // Temporary variable to hold all notes
  
        if (this.showArchived) {
          notes = notes.filter((note: Note) => note.isArchive && !note.isTrash);
        } 
        else if (this.showTrashed) {
          notes = notes.filter((note: Note) => note.isTrash);
        } 
        else {
          notes = notes.filter((note: Note) => !note.isArchive && !note.isTrash);
        }
  
        this.allNotes = notes; // Now assign after filtering
      },
  
      error: (err) => {
        console.error("Error fetching notes", err);
        this.snackBar.open('Error fetching notes!', 'Close', { duration: 3000 });
      }
    });
  }
  

  toggleColorPicker(note : Note , event: MouseEvent) {
    event.stopPropagation();  // Prevent click from propagating to document
    note.showColorPicker = !note.showColorPicker;
  }

  // Select color for the note
  selectColor(note : Note, color: string): void {
    note.color = color;
    note.showColorPicker = false;
  }
 

   // Archive a note by noteId
  onArchiveNote(note: Note)
  {
    this.noteService.archiveNote(note.noteId).subscribe({
          next:(res :any) =>{
            console.log("Note archive sucessfully", res);
            this.snackBar.open('Note archived successfully!', 'Close', { duration: 3000,});
            
            this.getNotes();//to refresh the notes after archiving
          
           // Update the notes list to reflect the archive status change
            note.isArchive = true;
          
        },
          error:(err:any) =>{
            console.error('error!  cant acrchive note')
            this.snackBar.open('Error archiving note. Please try again.', 'Close', {
              duration: 3000,
             
            });

          }
        });
  }


  OnTrashNote(note:Note)
  {
     const originalIsTrash = note.isTrash; //First, backup the current note state
      // note.isTrash = true; // Immediately move the note to trash

      this.noteService.trashNote(note.noteId).subscribe({

        next:(res:any) =>{

          console.log("Note Trash  sucessfully", res);
          const snackBarRef = this.snackBar.open('Note moved to trash!', 'Undo', { duration: 5000 });

            //  clicks on "Undo"
            snackBarRef.onAction().subscribe(() => {

               // Undo the trash operation
                note.isTrash = originalIsTrash; // Revert back the isTrash value
      
                this.noteService.trashNote(note.noteId).subscribe({

                  next: (undoRes: any) =>{
                  console.log('Undo successful', undoRes);

                  this.getNotes(); // Refresh the notes after trashing
                  note.isTrash = true;
                  //notes.isTrash = true; // Update the note status to trashed
                  },
                  error: (err: any) => 
                  {
                  console.error('Error!  undoing  trash ',err);
                  this.snackBar.open('Error undoing trash. Please referesh', 'Close', {duration: 3000, });
                  }

            });
       });
       
       setTimeout(() => {
        this.getNotes();}, 3000);       
        //this.getNotes(); // Refresh after trashing

  },


  error: (err: any) => {
    console.error('Error! Unable to trash note');
    this.snackBar.open('Error trashing note. Please try again.', 'Close', {
      duration: 3000,});
    }

  });
  }


  OnDeleteNote(note: Note): void {
    this.noteService.deleteNote(note.noteId).subscribe({
      next: (res: any) => {
        console.log('Note permanently deleted', res);
        this.snackBar.open('Note permanently deleted!', 'Close', { duration: 3000 });
        
        this.allNotes = this.allNotes.filter(n => n.noteId !== note.noteId);
        //this.getNotes(); // Refresh the notes after deletion
      },
      error: (err: any) => {
        console.error('Error deleting note', err);
        this.snackBar.open('Error deleting note. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
  

  OnRestore(note: Note): void {
    note.isTrash = false; // Update the local state
    this.noteService.trashNote(note.noteId).subscribe({
      next: (res: any) => {
        console.log('Note restored from trash', res);
        this.snackBar.open('Note restored!', 'Close', { duration: 3000 });
        this.getNotes(); // Refresh the notes after restoration
      },
      error: (err: any) => {
        console.error('Error restoring note', err);
        this.snackBar.open('Error restoring note. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }



}