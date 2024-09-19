import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogDisplaysComponent } from './edit-dialog-displays.component';

describe('EditDialogDisplaysComponent', () => {
  let component: EditDialogDisplaysComponent;
  let fixture: ComponentFixture<EditDialogDisplaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogDisplaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogDisplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
