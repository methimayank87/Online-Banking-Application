import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardnavbarComponent } from './dashboardnavbar.component';

describe('DashboardnavbarComponent', () => {
  let component: DashboardnavbarComponent;
  let fixture: ComponentFixture<DashboardnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
