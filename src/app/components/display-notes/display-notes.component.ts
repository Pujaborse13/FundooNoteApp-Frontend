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
    
    ngOnChanges() 
    {
      // When showArchived changes, reload the notes
      this.getNotes();
    }
      


  
  getNotes()
  {
    this.noteService.getAllNotes().subscribe({
      next: (res: any) => {

        console.log("API response:", res);
        this.allNotes = res.data ;

        // this.allNotes = Array.isArray(res) ? res: res.data;
        // console.log(this.allNotes);


        if(this.showArchived)
        {
          this.allNotes= this.allNotes.filter((note : Note ) => note.isArchive);

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
        this.snackBar.open(' Error fetching notes !', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']});

        //console.error("Error fetching notes", err);
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
  onArchiveNote(notes: Note)
  {
    this.noteService.archiveNote(notes.noteId).subscribe({
          next:(res :any) =>{
            console.log("Note archive sucessfully", res);
            this.snackBar.open('Note archived successfully!', 'Close', { duration: 3000,});
            
            this.getNotes();//to refresh the notes after archiving
          
      // // Update the notes list to reflect the archive status change
            notes.isArchive = true;
          
        },
          error:(err:any) =>{
            console.error('error!  cant acrchive note')
            this.snackBar.open('Error archiving note. Please try again.', 'Close', {
              duration: 3000,
             
            });

          }
        });


  }


  OnTrashNote(notes:Note)
  {
    this.noteService.trashNote(notes.noteId).subscribe({
      next:(res:any) =>{
        console.log("Note Trash  sucessfully", res);
        this.snackBar.open('Note Trash !', 'Undo', { duration: 3000,});
        this.getNotes(); // Refresh the notes after trashing
        notes.isTrash = true; // Update the note status to trashed
      
      },
      error: (err: any) => {
        console.error('Error! Unable to trash note');
        this.snackBar.open('Error trashing note. Please try again.', 'Close', {
          duration: 3000,
        });
      }

    });
    
  }

}
