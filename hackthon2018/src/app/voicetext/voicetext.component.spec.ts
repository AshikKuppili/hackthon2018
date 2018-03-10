import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicetextComponent } from './voicetext.component';

describe('VoicetextComponent', () => {
  let component: VoicetextComponent;
  let fixture: ComponentFixture<VoicetextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicetextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicetextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
