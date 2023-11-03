import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { FormsModule } from '@angular/forms';
import { GoogleModule } from '../../google/google.module';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      imports: [FormsModule, GoogleModule],
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe establecer isLastPage en verdadero cuando elementTo sea mayor o igual que el total.', () => {
    component.total = 5;
    component.numberPage = 1;

    component.ngOnChanges();

    expect(component.isLastPage).toBe(true);
  });

  test('debería calcular paginationInfo correctamente.', () => {
    component.total = 15;
    component.numberPage = 1;

    component.ngOnChanges();

    expect(component.paginationInfo).toBe('6 - 10 de 15');
  });

  test('debería emitir el evento onNextPage.', () => {
    const onNextPageSpy = jest.spyOn(component.nextPage, 'emit');

    component.onNextPage();

    expect(onNextPageSpy).toHaveBeenCalled();
  });

  test('debería emitir el evento onPrevPage.', () => {
    const onPrevPageSpy = jest.spyOn(component.prevPage, 'emit');

    component.onPrevPage();

    expect(onPrevPageSpy).toHaveBeenCalled();
  });

  test('debe emitir el evento onPageSizeChanged con el valor correcto', () => {
    const onPageSizeChangedSpy = jest.spyOn(component.pageSizeChanged, 'emit');

    component.onPageSizeChanged();

    expect(onPageSizeChangedSpy).toHaveBeenCalledWith(component.pageSize);
  });
});
