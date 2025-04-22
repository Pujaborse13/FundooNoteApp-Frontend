import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
    console.log('Note:', this.noteForm.value);
    this.noteForm.reset();
    this.selectedColor = '#ffffff';
    this.isExpanded = false;
    this.showColorPalette = false;
  }

  onSubmit() {
    if (this.noteForm.valid) {
      console.log('Form Data:', this.noteForm.value);
    }
  }
}
