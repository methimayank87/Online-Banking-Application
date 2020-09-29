import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbeneficiarydetailsComponent } from './viewbeneficiarydetails.component';

describe('ViewbeneficiarydetailsComponent', () => {
  let component: ViewbeneficiarydetailsComponent;
  let fixture: ComponentFixture<ViewbeneficiarydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbeneficiarydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbeneficiarydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
