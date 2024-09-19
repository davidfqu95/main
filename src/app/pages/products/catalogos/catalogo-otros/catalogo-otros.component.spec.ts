import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoOtrosComponent } from './catalogo-otros.component';

describe('CatalogoOtrosComponent', () => {
  let component: CatalogoOtrosComponent;
  let fixture: ComponentFixture<CatalogoOtrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoOtrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoOtrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
