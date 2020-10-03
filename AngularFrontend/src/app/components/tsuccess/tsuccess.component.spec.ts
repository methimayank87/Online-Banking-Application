import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TsuccessComponent } from './tsuccess.component';

describe('TsuccessComponent', () => {
  let component: TsuccessComponent;
  let fixture: ComponentFixture<TsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
