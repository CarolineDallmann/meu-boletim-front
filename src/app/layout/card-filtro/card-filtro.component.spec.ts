import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFiltroComponent } from './card-filtro.component';

describe('CardFiltroComponent', () => {
  let component: CardFiltroComponent;
  let fixture: ComponentFixture<CardFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFiltroComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
