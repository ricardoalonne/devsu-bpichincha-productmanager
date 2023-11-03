import { TestBed } from '@angular/core/testing';

import { DateFormatService } from './date-format.service';
import { DatePipe } from '@angular/common';

describe('DateFormatService', () => {
  let service: DateFormatService;
  let datePipe: DatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe],
    });
    service = TestBed.inject(DateFormatService);
    datePipe = TestBed.inject(DatePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('debería convertir una fecha en un string formateado.', () => {
    const myDate = new Date(1698278400000);
    const result = service.transform(myDate);
    expect(result).toEqual('2023-10-26');
  });

  test('debería convertir una fecha en un string formateado.', () => {
    const myDate = new Date(1698364800000);
    const result = service.convertOnlyDate(myDate);
    expect(result).toEqual('2023-10-26T00:00:00.000');
  });

  it('should handle null from datePipe.transform', () => {
    jest.spyOn(datePipe, 'transform').mockReturnValue(null);

    const myDate = new Date(1698296400000);
    const formattedDate = service.convertOnlyDate(myDate);

    expect(formattedDate).toBe(myDate.toDateString());
  });

  test('debería añadir años a una fecha.', () => {
    const myDate = new Date(1698296400000);
    const result = service.addYears(myDate);
    expect(result).toEqual(new Date('2024-10-26T05:00:00.000Z'));
  });

  test('debería añadir meses a una fecha.', () => {
    const myDate = new Date(1698296400000);
    const result = service.addMonths(myDate);
    expect(result).toEqual(new Date('2023-11-26T05:00:00.000Z'));
  });

  test('debería añadir días a una fecha.', () => {
    const myDate = new Date(1698296400000);
    const result = service.addDays(myDate);
    expect(result).toEqual(new Date('2023-10-27T05:00:00.000Z'));
  });
});
