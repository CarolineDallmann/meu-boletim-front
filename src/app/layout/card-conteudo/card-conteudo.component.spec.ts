import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConteudoComponent } from './card-conteudo.component';

describe('CardConteudoComponent', () => {
  let component: CardConteudoComponent;
  let fixture: ComponentFixture<CardConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardConteudoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
