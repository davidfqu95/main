import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogLonasComponent } from './edit-dialog-lonas.component';

describe('EditDialogLonasComponent', () => {
  let component: EditDialogLonasComponent;
  let fixture: ComponentFixture<EditDialogLonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogLonasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogLonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
