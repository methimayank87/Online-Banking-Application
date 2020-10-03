import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditraddressComponent } from './editraddress.component';

describe('EditraddressComponent', () => {
  let component: EditraddressComponent;
  let fixture: ComponentFixture<EditraddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditraddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditraddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
