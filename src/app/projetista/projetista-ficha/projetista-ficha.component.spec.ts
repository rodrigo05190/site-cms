import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjetistaFichaComponent } from './projetista-ficha.component';

describe('ProjetistaFichaComponent', () => {
  let component: ProjetistaFichaComponent;
  let fixture: ComponentFixture<ProjetistaFichaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetistaFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetistaFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
