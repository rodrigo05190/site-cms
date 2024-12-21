import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrmCardComponent } from './crm-card.component';

describe('CrmCardComponent', () => {
  let component: CrmCardComponent;
  let fixture: ComponentFixture<CrmCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
