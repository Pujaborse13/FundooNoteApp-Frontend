import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note/note.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

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
              private route: ActivatedRoute,
              private dialog: MatDialog ,
            ) {}

  ngOnInit() {
   this.getNotes(); //display notes while loading 
    }
    
    ngOnChanges() {
      // When showArchived changes, reload the notes
      this.getNotes();
    }
      
  
  getNotes()
  {
    this.noteService.getAllNotes().subscribe({
      next: (res: any) => {

        console.log("API response:", res);
        this.allNotes = res.data ;

        if(this.showArchived)
        {
          this.allNotes= this.allNotes.filter((note : Note ) => note.isArchive && !note.isTrash);
          
        }
        else if(this.showTrashed)
        {
          this.allNotes = this.allNotes.filter((note : Note ) => note.isTrash);
        }
        else
        {
          this.allNotes = this.allNotes.filter((note: Note) => !note.isArchive && !note.isTrash); // Show regular notes
         // Filter notes based on the showArchived property
          //this.allNotes = this.allNotes.filter((note: Note) => this.showArchived ? note.isArchive : !note.isArchive);
        }

      },

      error: (err) => {
        this.snackBar.open(' Error fetching notes !', 'Close', {duration: 3000});
        //console.error("Error fetching notes", err);
      }
    });

  }
    

  toggleColorPicker(note : Note , event: MouseEvent) {
    event.stopPropagation();  // Prevent click from propagating to document
    note.showColorPicker = !note.showColorPicker;
  }

  // Select color for the note
  selectColor(note : Note, color: string , event: MouseEvent): void {
    event.stopPropagation();

    console.log("Color received in selectColor():", color);

    if (!color || color.trim() === '') {
      console.warn('No color selected. Ignoring...');
      this.snackBar.open('No color selected.', 'Close', { duration: 2000 });

      return;
    }
    
    note.showColorPicker = false;
    note.color = color; 
    this.noteService.addColor(note.noteId ,color).subscribe({

      next: (res: any) =>{

        this.snackBar.open('Color Updated Sucessfully !', 'close', {duration: 3000});
        console.log("Selected color:", color);

      },
      error:(err: any)=>{
        console.error('Error Updating color',err);
        this.snackBar.open('Failed to update color.', 'Close', { duration: 3000 });


      } 
    })
  }
 
   // Archive a note by noteId
  onArchiveNote(note: Note , event : MouseEvent)
  {
    event.stopPropagation();
    this.noteService.archiveNote(note.noteId).subscribe({
          next:(res :any) =>{
            console.log("Note archive sucessfully", res);
            this.snackBar.open('Note archived successfully!', 'Close', { duration: 3000,});
            
            this.getNotes();//to refresh the notes after archiving
          
           // Update the notes to reflect the archive status change
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


  OnTrashNote(note:Note, event : MouseEvent)
  {
    event.stopPropagation();
    
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


  OnDeleteNote(note: Note , event : MouseEvent): void {
    event.stopPropagation();
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
  

  OnRestore(note: Note , event : MouseEvent): void {
    event.stopPropagation();

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



  openNoteForEdit(note: any , event: MouseEvent) {
    event.stopPropagation();
    

    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      data: note
    });

    dialogRef.afterClosed().subscribe((updatedNote) => {
      if (updatedNote) {
        const index = this.allNotes.findIndex((n: any) => n.noteId === updatedNote.noteId);
        if (index !== -1) {
          this.allNotes[index] = updatedNote;
        }
      }
    });
  }


  openCollaboratorDialog(note: any, event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '400px',
      data: note
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Collaborator added:", result);
        // You can refresh note data here if needed
      }
    });
  }



  onPinNote(note: Note, event: MouseEvent): void {
    event.stopPropagation();
    // TODO: implement pin/unpin logic
    this.snackBar.open('Pin clicked (functionality pending)', 'Close', { duration: 2000 });
  }
  


  onMoreClicked(event: MouseEvent): void {
    event.stopPropagation();
  }
  















}





