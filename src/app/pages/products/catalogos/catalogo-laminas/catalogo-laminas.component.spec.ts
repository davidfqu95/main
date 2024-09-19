import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoLaminasComponent } from './catalogo-laminas.component';

describe('CatalogoLaminasComponent', () => {
  let component: CatalogoLaminasComponent;
  let fixture: ComponentFixture<CatalogoLaminasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoLaminasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoLaminasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
