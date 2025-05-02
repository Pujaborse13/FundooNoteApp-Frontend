import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelService } from 'src/app/services/label/label.service';
import { EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent {
  
  labelName = '';
  labelList: any[] = []; // Store created labels
  @Output() labelsChanged = new EventEmitter<void>();



  constructor(private labelService: LabelService ,  
              private dialogRef: MatDialogRef<EditLabelComponent>,
              private snackBar : MatSnackBar) {}

  ngOnInit(): void {
      this.getLabels(); // Fetch on open
    }

    getLabels() {
      this.labelService.GetLabelByUserId().subscribe({
      next:  (res: any) => {
          if (res && res.success) {
            this.labelList = res.data;  // Set the label list from backend
            
          } else {
            this.snackBar.open('Failed to load labels', 'Close', { duration: 2000 });
          }
        },
        error: err => {
          this.snackBar.open('Error fetching labels', 'Close', { duration: 2000 });
        }
    });
    }


    createLabel() {
      if (this.labelName.trim()) {
        const payload = { labelName: this.labelName.trim() };
        
        this.labelService.createLabel(payload).subscribe({
         next: (res: any) => {
            this.snackBar.open('Label created!', 'Close', { duration: 2000 });
            this.labelList.push(res); // Push new label to list
            this.labelName = '';
            this.labelsChanged.emit();  // after label creation or deletion

          },
          error :err => {
            this.snackBar.open('Failed to create label', 'Close', { duration: 2000 });
          }
      });
      }
    }
    

    close() {
      this.dialogRef.close();
    }
  
    deleteLabel(label: any) {
      this.labelService.deleteLabel(label.labelId).subscribe({
        next: () => {
          this.labelList = this.labelList.filter(l => l.labelId !== label.labelId);
          this.snackBar.open('Label deleted', 'Close', { duration: 2000 });
          this.labelsChanged.emit();  // after label  deletion

        },
        error: (err) => {
          console.error('Delete label failed:', err);
          this.snackBar.open('Failed to delete label', 'Close', { duration: 2000 });
        }
      });
    }
    

    
    editLabel(label: any) {
      // Optional: open edit input or inline editor
    }
    
  
}
