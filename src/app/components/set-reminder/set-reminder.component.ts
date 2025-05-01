import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-set-reminder',
  templateUrl: './set-reminder.component.html',
  styleUrls: ['./set-reminder.component.scss']
})
export class SetReminderComponent {

  selectedReminder:  string | null = null;

  constructor(
    private dialogRef: MatDialogRef<SetReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteService
  ) {}


  setReminder() {
    if (this.selectedReminder) {
     
      const payload = { reminder: new Date(this.selectedReminder).toISOString() };
      //const payload = { reminder: this.selectedReminder };

      this.noteService.addReminder(this.data.noteId, payload).subscribe({
        next: (res) => {
          console.log('Reminder set successfully:', res);
          this.dialogRef.close(true); // Notify parent
        },

        error: (err) => {
          console.error('Failed to set reminder:', err);
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
