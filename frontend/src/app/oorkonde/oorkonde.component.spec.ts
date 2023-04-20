import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OorkondeComponent } from './oorkonde.component';

describe('OorkondeComponent', () => {
  let component: OorkondeComponent;
  let fixture: ComponentFixture<OorkondeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OorkondeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OorkondeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
