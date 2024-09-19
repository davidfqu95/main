import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogVinilesComponent } from './edit-dialog-viniles.component';

describe('EditDialogVinilesComponent', () => {
  let component: EditDialogVinilesComponent;
  let fixture: ComponentFixture<EditDialogVinilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogVinilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogVinilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
