import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { By } from '@angular/platform-browser';
import { GoogleModule } from '../google/google.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Renderer2 } from '@angular/core';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [RouterTestingModule, GoogleModule],
      providers: [Renderer2],
    });
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.items = [
      { name: 'MyAction', action: () => {}, redirectTo: 'my-action' },
    ];
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('inicialmente debería tener el menú desplegable cerrado', () => {
    expect(component.isDropdownOpen).toBe(false);
  });

  test('debería cambiar a false cuando se haga click fuera del dropdown', () => {
    const button = fixture.debugElement.query(By.css('.dropdown-button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    document.body.click();
    fixture.detectChanges();
    expect(component.isDropdownOpen).toBe(false);
  });

  test('debería alternar el menú desplegable cuando se hace clic en el botón', () => {
    const button = fixture.debugElement.query(By.css('.dropdown-button'));

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isDropdownOpen).toBe(true);

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isDropdownOpen).toBe(false);
  });

  test('debería cerrar el menú desplegable cuando se hace clic en la opción', () => {
    const routerSpy = jest.spyOn(component['router'], 'navigate');

    const button = fixture.debugElement.query(By.css('.dropdown-button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const buttonOption = fixture.debugElement.query(By.css('.dropdown-item'));
    buttonOption.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isDropdownOpen).toBe(false);

    const pathRedirect = component.items.find(
      (item) => item.redirectTo === button.nativeElement.textContent
    );
    if (pathRedirect) {
      expect(routerSpy).toHaveBeenCalledWith([pathRedirect]);
    }
  });
});
