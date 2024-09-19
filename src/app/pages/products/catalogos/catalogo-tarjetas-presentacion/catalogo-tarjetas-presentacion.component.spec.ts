import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTarjetasPresentacionComponent } from './catalogo-tarjetas-presentacion.component';

describe('CatalogoTarjetasPresentacionComponent', () => {
  let component: CatalogoTarjetasPresentacionComponent;
  let fixture: ComponentFixture<CatalogoTarjetasPresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoTarjetasPresentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTarjetasPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
