import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})

export class AddNoteComponent implements OnInit {
  isExpanded = false;
  showColorPalette = false;
  selectedColor: string = '#ffffff'; // default background color

  noteForm!: FormGroup;

  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
  ];

  constructor(private fb: FormBuilder,private noteService: NoteService, private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', Validators.required]
    });
  }

  togglePin(event: MouseEvent) {
    event.stopPropagation();
  }

 
  toggleColorPalette() {
    console.log('Toggling color palette');
    this.showColorPalette = !this.showColorPalette;
  }



  selectColor(color: string) {
    this.selectedColor = color;
    this.showColorPalette = false;
  }

  expandNote() {
    this.isExpanded = true;
  }



  closeNote() {
    if (this.noteForm.valid) {
      
      const payload = {
        title: this.noteForm.value.title,
        description: this.noteForm.value.description,
        color: this.selectedColor
      };

      this.noteService.createNote(payload).subscribe({


        next: (result: any) => {
          console.log('Note created successfully:', result);
          this.snackBar.open('Note added successfully!', 'Close', { duration: 3000 });
        },

        
        error: (err:any) => {
          console.error('Failed to create note:', err);
        }
      });
    }

    this.noteForm.reset();
    this.selectedColor = '#ffffff';
    this.isExpanded = false;
    this.showColorPalette = false;
  }

  onSubmit() {
    this.closeNote();
  }
  
}
  



  