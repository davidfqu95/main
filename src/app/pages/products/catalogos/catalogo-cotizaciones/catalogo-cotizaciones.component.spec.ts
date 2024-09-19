import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCotizacionesComponent } from './catalogo-cotizaciones.component';

describe('CatalogoCotizacionesComponent', () => {
  let component: CatalogoCotizacionesComponent;
  let fixture: ComponentFixture<CatalogoCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoCotizacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
