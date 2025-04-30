import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollaboratorService } from 'src/app/services/collaborator/collaborator.service';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent {


  email: string = '';

  constructor(
    private dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note: any,
    private collaboratorService: CollaboratorService,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.email) {
      this.snackBar.open("Please enter a valid email!", "Close", { duration: 3000 });
      return;
    }
  
    const payload = {
      noteId: this.note.noteId,
      email: this.email
    };
  
    this.collaboratorService.addCollaborator(payload).subscribe({
      next: (res: any) => {
        this.snackBar.open("Added to Collaborate!", "Close", { duration: 3000 });
        this.dialogRef.close(this.email);  // Return email to parent if needed
      },
      error: (err) => {
        console.error("Error adding collaborator", err);
        this.snackBar.open("Failed to add collaborator.", "Close", { duration: 3000 });
      }
    });
  }
}