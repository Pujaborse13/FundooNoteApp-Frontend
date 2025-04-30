import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotesComponent } from './update-notes.component';

describe('UpdateNotesComponent', () => {
  let component: UpdateNotesComponent;
  let fixture: ComponentFixture<UpdateNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNotesComponent]
    });
    fixture = TestBed.createComponent(UpdateNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
