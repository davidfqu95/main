import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTelasComponent } from './catalogo-telas.component';

describe('CatalogoTelasComponent', () => {
  let component: CatalogoTelasComponent;
  let fixture: ComponentFixture<CatalogoTelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoTelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
