import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/note/note.service';

interface Note {
  noteId: number
  title: string;
  description: string;
  color:string;
  showColorPicker :boolean;
  isArchive: boolean;
}

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})

export class DisplayNotesComponent implements OnInit{

  allNotes: Note[] = [];
  isColorPickerVisible: boolean = false;
  
  colors: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  constructor(private noteService: NoteService , private snackBar :MatSnackBar) {}

  ngOnInit() {
    this.getNotes(); //display notes while loading 
  }

  getNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (res: any) => {

        console.log("API response:", res);
        this.allNotes = res.data ;
      },

      error: (err) => {
        console.error("Error fetching notes", err);
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
 


  onArchiveNote(noteId: number)
  {
    this.noteService.archiveNote(noteId).subscribe({
          next:(res :any) =>{
            console.log("Note archive sucessfully", res);
            this.snackBar.open('Note archived successfully!', 'Close', {
              duration: 3000,
              
          })
            this.getNotes(); //referesh notes
        },
          error:(err:any) =>{
            console.error('error!  cant acrchive note')
            this.snackBar.open('Error archiving note. Please try again.', 'Close', {
              duration: 3000,
             
            });

          }
        });


    }

}
