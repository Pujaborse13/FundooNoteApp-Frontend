import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-assign-label',
  templateUrl: './assign-label.component.html',
  styleUrls: ['./assign-label.component.scss']
})
export class AssignLabelComponent {

  labels: any[] = [];
  selectedLabels: any[] = [];

  constructor(
    private labelService: LabelService,
    private dialogRef: MatDialogRef<AssignLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public note: any
  ) {}

  ngOnInit(): void {
    this.labelService.GetLabelByUserId().subscribe({
      next: (res: any) => this.labels = res.data,
      error: () => console.error("Failed to load labels")
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.selectedLabels);
  }
}

