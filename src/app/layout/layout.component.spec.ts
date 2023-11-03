import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { LayoutService } from './services/layout.service';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { GoogleModule } from '../components/google/google.module';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let layoutService: LayoutService;
  let renderer: Renderer2;
  let router: Router;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        SidebarComponent,
        FooterComponent,
        TopbarComponent,
      ],
      imports: [RouterTestingModule, GoogleModule],
      providers: [Renderer2, LayoutService],
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    renderer = TestBed.inject(Renderer2);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debería ocultar el menú', () => {
    component.menuOutsideClickListener = jest.fn();
    component.layoutService.state.staticMenuMobileActive = true;
    component.layoutService.state.menuHoverActive = true;

    component.hideMenu();

    expect(component.layoutService.state.staticMenuMobileActive).toBe(false);
    expect(component.layoutService.state.menuHoverActive).toBe(false);
    expect(component.menuOutsideClickListener).toBeNull();
  });

  test('debería bloquear el body del scroll', () => {
    const addClassSpy = jest.spyOn(document.body.classList, 'add');
    component.blockBodyScroll();
    expect(addClassSpy).toHaveBeenCalledWith('blocked-scroll');
  });

  test('debería desbloquear el body del scroll', () => {
    const removeClassSpy = jest.spyOn(document.body.classList, 'remove');
    component.unblockBodyScroll();
    expect(removeClassSpy).toHaveBeenCalledWith('blocked-scroll');
  });

  test('debería devolver containerClass según la configuración de layoutService', () => {
    component.layoutService.config.menuMode = 'overlay';
    expect(component.containerClass['layout-overlay']).toBe(true);

    component.layoutService.config.menuMode = 'static';
    expect(component.containerClass['layout-static']).toBe(true);

    component.layoutService.config.menuMode = 'static';
    component.layoutService.state.staticMenuDesktopInactive = true;
    expect(component.containerClass['layout-static-inactive']).toBe(true);

    component.layoutService.state.staticMenuMobileActive = true;
    expect(component.containerClass['layout-mobile-active']).toBe(true);
  });

  test('debería darse de baja de las suscripciones en ngOnDestroy', () => {
    const mockSubscription = new Subscription();
    component.menuOutsideClickListener = () => {};

    component.overlayMenuOpenSubscription = mockSubscription;

    const unsubscribeSpy = jest.spyOn(mockSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
