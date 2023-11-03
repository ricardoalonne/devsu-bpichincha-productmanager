import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleIconComponent } from './google.icon.component';

describe('GoogleIconComponent', () => {
  let component: GoogleIconComponent;
  let fixture: ComponentFixture<GoogleIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleIconComponent],
    });
    fixture = TestBed.createComponent(GoogleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
