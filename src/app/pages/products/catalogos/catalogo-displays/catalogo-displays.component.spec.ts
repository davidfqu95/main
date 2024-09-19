import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDisplaysComponent } from './catalogo-displays.component';

describe('CatalogoDisplaysComponent', () => {
  let component: CatalogoDisplaysComponent;
  let fixture: ComponentFixture<CatalogoDisplaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoDisplaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoDisplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
