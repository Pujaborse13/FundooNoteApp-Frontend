import { Component, Input, ViewChild } from '@angular/core';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss']
})
export class AllNotesComponent {

  @ViewChild(DisplayNotesComponent) displayNoteComp !: DisplayNotesComponent;

  @Input() showArchived: boolean = false; 

  onNoteAdded(newNote : any)
  {
    if(this.displayNoteComp)
    {
      this.displayNoteComp.getNotes();
    }
  }

}
