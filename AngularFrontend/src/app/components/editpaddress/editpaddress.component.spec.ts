import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpaddressComponent } from './editpaddress.component';

describe('EditpaddressComponent', () => {
  let component: EditpaddressComponent;
  let fixture: ComponentFixture<EditpaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
