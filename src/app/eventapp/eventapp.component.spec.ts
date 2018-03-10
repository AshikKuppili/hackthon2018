import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventappComponent } from './eventapp.component';

describe('EventappComponent', () => {
  let component: EventappComponent;
  let fixture: ComponentFixture<EventappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
