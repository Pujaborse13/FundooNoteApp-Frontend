import { Component, Input, ViewChild } from '@angular/core';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss']
})
export class AllNotesComponent {

  //parent comp. (AllNotesComponent) to get a direct reference to a child component instance (DisplayNotesComponent) 
  @ViewChild(DisplayNotesComponent) displayNoteComp !: DisplayNotesComponent;

  @Input() showArchived: boolean = false; 

  @Input() showTrashed :boolean = false;

  @Input() showReminder: boolean = false;




  //onNoteAdded(newNote : any)
  onNoteAdded(){
    if(this.displayNoteComp)
    {
      this.displayNoteComp.getNotes();
    }
  }

}
