import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraingCenterPeceComponent } from './traing-center-pece.component';

describe('TraingCenterPeceComponent', () => {
  let component: TraingCenterPeceComponent;
  let fixture: ComponentFixture<TraingCenterPeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraingCenterPeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraingCenterPeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
