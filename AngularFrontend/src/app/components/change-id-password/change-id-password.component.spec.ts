import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIdPasswordComponent } from './change-id-password.component';

describe('ChangeIdPasswordComponent', () => {
  let component: ChangeIdPasswordComponent;
  let fixture: ComponentFixture<ChangeIdPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeIdPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeIdPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
