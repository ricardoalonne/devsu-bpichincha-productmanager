import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainComponent } from './home.main.component';
import { GoogleModule } from '../../../../components/google/google.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeMainComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainComponent],
      imports: [GoogleModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(HomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
