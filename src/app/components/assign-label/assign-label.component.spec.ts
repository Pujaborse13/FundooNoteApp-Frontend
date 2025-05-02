import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLabelComponent } from './assign-label.component';

describe('AssignLabelComponent', () => {
  let component: AssignLabelComponent;
  let fixture: ComponentFixture<AssignLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignLabelComponent]
    });
    fixture = TestBed.createComponent(AssignLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
