import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NoteService } from 'src/app/services/note/note.service';

interface Note {
  id : number;
  title: string;
  description: string;
  color?:string;
  pinned?:boolean;
  showColorPicker?:boolean;
}

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})

export class DisplayNotesComponent implements OnInit{

  allNotes: any[] = [];
  isColorPickerVisible: boolean = false;
  
  colors: string[] = [
    '#FFF9C4', '#FFE0B2', '#E1BEE7', '#B2EBF2', '#B3E5FC', '#F8BBD0',
    '#DCEDC8', '#EDE7F6', '#FFCDD2', '#FFF3E0', '#F5F5F5', '#E0F7FA'
  ];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getAllNotes().subscribe({
      next: (res: any) => {
        console.log("API response:", res);
        this.allNotes = res.data || res;
      },

      error: (err) => {
        console.error("Error fetching notes", err);
      }
    });
  }

  toggleColorPicker(event: MouseEvent) {
    event.stopPropagation();  // Prevent click from propagating to document
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }

  // Select color for the note
  selectColor(note : Note, color: string): void {
    note.color = color;
    note.showColorPicker = false;
  }
 

}
