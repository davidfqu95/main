import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasPresentacionComponent } from './tarjetas-presentacion.component';

describe('TarjetasPresentacionComponent', () => {
  let component: TarjetasPresentacionComponent;
  let fixture: ComponentFixture<TarjetasPresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetasPresentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetasPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
