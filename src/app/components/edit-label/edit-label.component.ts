import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelService } from 'src/app/services/label/label.service';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent {
  
  labelName = '';
  labelList: any[] = []; // Store created labels


  constructor(private labelService: LabelService ,  
              private dialogRef: MatDialogRef<EditLabelComponent>,
              private snackBar : MatSnackBar) {}

  close() {
    this.dialogRef.close();
  }

  createLabel() {
    if (this.labelName.trim()) {
      const payload = { labelName: this.labelName };
      
      this.labelService.createLabel(payload).subscribe(
        (res) => {
          console.log('Label created:', res);

          this.snackBar.open('Label created successfully!', 'Close', {
            duration: 3000,  
          });

          this.labelList.push(res); // Assuming API returns the created label object
          this.labelName = '';
          
          //this.dialogRef.close();   // Close the dialog after creation
        },
        (err) => {
          console.error('Error creating label:', err);

          this.snackBar.open('Error creating label. Please try again.', 'Close', {
            duration: 3000,  // Snackbar duration
          });
        }
      );
    }
  }
}
