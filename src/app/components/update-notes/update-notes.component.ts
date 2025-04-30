import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNotesComponent {

  title: string;
  description: string;
  color: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public note: any,
    private noteService: NoteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateNotesComponent>
  ) {
    this.title = note.title;
    this.description = note.description;
    this.color = note.color;
  }

  ngOnDestroy() {
    this.updateNote();  // This ensures update is triggered on any close
  }

  private isUpdated = false;

  updateNote() {

    if (this.isUpdated) return;  // Prevent double-call
    this.isUpdated = true;
    
    const updatedNote = {
      ...this.note,
      title: this.title,
      description: this.description,
      color: this.color
    };

    this.noteService.updateNote(this.note.noteId, updatedNote).subscribe({

      next: () => {
        this.snackBar.open('Note updated successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(updatedNote);
      },
      error: () => {
        this.snackBar.open('Failed to update note', 'Close', { duration: 3000 });
      }
    });
  }

  closeDialog() {
    this.updateNote(); // Save changes
  }

}
