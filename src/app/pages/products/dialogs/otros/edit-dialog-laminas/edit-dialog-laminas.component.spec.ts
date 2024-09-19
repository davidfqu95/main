import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogLaminasComponent } from './edit-dialog-laminas.component';

describe('EditDialogLaminasComponent', () => {
  let component: EditDialogLaminasComponent;
  let fixture: ComponentFixture<EditDialogLaminasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogLaminasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogLaminasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
