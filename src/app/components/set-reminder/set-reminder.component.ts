import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-reminder',
  templateUrl: './set-reminder.component.html',
  styleUrls: ['./set-reminder.component.scss']
})
export class SetReminderComponent {
  selectedDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<SetReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSetReminder(): void {
    this.dialogRef.close(this.selectedDate);
  }

}
