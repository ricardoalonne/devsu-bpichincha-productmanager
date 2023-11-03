import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalConfirmComponent } from './modal.confirm.component';
import { Renderer2 } from '@angular/core';
import { GoogleModule } from '../../google/google.module';

describe('ModalConfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmComponent],
      imports: [GoogleModule],
      providers: [Renderer2],
    });
    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debería cambiar a false cuando se haga click fuera del modal', () => {
    component.isOpenModal = true;
    fixture.detectChanges();

    const modalConfirm = fixture.debugElement.query(By.css('.modal-confirm'));
    modalConfirm.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpenModal).toBe(false);
  });

  test('debería inicializar el valor de isOpenModal a false', () => {
    expect(component.isOpenModal).toBe(false);
  });

  test('debería cambiar el valor de isOpenModal a true al ejecutar onOpenModal()', () => {
    component.isOpenModal = false;
    component.onOpenModal();
    expect(component.isOpenModal).toBe(true);
  });

  test('debería cambiar el valor de isOpenModal a false al ejecutar onCloseModal()', () => {
    component.isOpenModal = true;
    component.onCloseModal();
    expect(component.isOpenModal).toBe(false);
  });

  test('dbería ejecutar onCloseModal() despues de haber ejecutado onActionModal()', () => {
    const emitSpy = jest.spyOn(component.action, 'emit');
    const onCloseModalSpy = jest.spyOn(component, 'onCloseModal');
    component.onActionModal();
    expect(emitSpy).toHaveBeenCalledWith(component.isOpenModal);
    expect(onCloseModalSpy).toHaveBeenCalled();
  });
});
