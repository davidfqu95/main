import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogTelasComponent } from './edit-dialog-telas.component';

describe('EditDialogTelasComponent', () => {
  let component: EditDialogTelasComponent;
  let fixture: ComponentFixture<EditDialogTelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogTelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogTelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
