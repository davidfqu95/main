import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogOtrosComponent } from './edit-dialog-otros.component';

describe('EditDialogOtrosComponent', () => {
  let component: EditDialogOtrosComponent;
  let fixture: ComponentFixture<EditDialogOtrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogOtrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogOtrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
