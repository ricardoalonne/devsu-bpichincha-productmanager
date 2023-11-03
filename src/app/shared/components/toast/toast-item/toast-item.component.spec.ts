import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastItemComponent } from './toast-item.component';
import { GoogleModule } from '../../../../components/google/google.module';

describe('ToastItemComponent', () => {
  let component: ToastItemComponent;
  let fixture: ComponentFixture<ToastItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastItemComponent],
      imports: [GoogleModule],
    });
    fixture = TestBed.createComponent(ToastItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debería cerrar el toast después de 5 segundos si autoClosing es verdadero', () => {
    component.autoClosing = true;
    jest.useFakeTimers();
    component.ngOnInit();
    jest.advanceTimersByTime(5000);
    expect(component.closeToast).toBe(true);
  });

  test('debería definir el icono en base al severity si no se ha definido el icono', () => {
    component.iconName = undefined;
    component.severity = 'success';
    component.ngOnInit();
    expect(component.iconName).toBe('check_circle');

    component.iconName = undefined;
    component.severity = 'warn';
    component.ngOnInit();
    expect(component.iconName).toBe('warning');

    component.iconName = undefined;
    component.severity = 'info';
    component.ngOnInit();
    expect(component.iconName).toBe('info');

    component.iconName = undefined;
    component.severity = 'error';
    component.ngOnInit();
    expect(component.iconName).toBe('report');
  });

  test('debería cambiar close a verdadero y eliminar el elemento después de 200 ms en onCloseToast', () => {
    component.closeToast = false;
    jest.useFakeTimers();
    component.onCloseToast();
    expect(component.closeToast).toBe(true);

    jest.advanceTimersByTime(200);
  });

  test('tClass debería devolver la clase "close" cuando close es verdadero', () => {
    component.closeToast = true;
    expect(component.toastClass).toEqual({
      'close-toast': true,
      'auto-closing': false,
    });
  });

  test('tClass debería devolver la clase "closing" cuando closing es verdadero', () => {
    component.autoClosing = true;
    expect(component.toastClass).toEqual({
      'close-toast': false,
      'auto-closing': true,
    });
  });
});
