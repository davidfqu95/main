import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogTarjetasPresentacionComponent } from './edit-dialog-tarjetas-presentacion.component';

describe('EditDialogTarjetasPresentacionComponent', () => {
  let component: EditDialogTarjetasPresentacionComponent;
  let fixture: ComponentFixture<EditDialogTarjetasPresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogTarjetasPresentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDialogTarjetasPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
