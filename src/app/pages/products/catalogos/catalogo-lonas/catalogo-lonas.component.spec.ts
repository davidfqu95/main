import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoLonasComponent } from './catalogo-lonas.component';

describe('CatalogoLonasComponent', () => {
  let component: CatalogoLonasComponent;
  let fixture: ComponentFixture<CatalogoLonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoLonasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoLonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
