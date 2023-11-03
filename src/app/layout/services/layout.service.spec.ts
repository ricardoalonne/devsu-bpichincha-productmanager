import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('debería alternar el menú en el escritorio.', () => {
    service.onMenuToggle();
    expect(service.state.staticMenuDesktopInactive).toBe(true);

    service.onMenuToggle();
    expect(service.state.staticMenuDesktopInactive).toBe(false);
  });

  test('debería alternar el menú en el móvil.', () => {
    jest.spyOn(service, 'isDesktop').mockReturnValue(false);

    expect(service.isMobile()).toBeTruthy();

    service.onMenuToggle();
    expect(service.state.staticMenuMobileActive).toBe(true);

    service.onMenuToggle();
    expect(service.state.staticMenuMobileActive).toBe(false);
  });

  test('debería detectar el menú superpuesto.', () => {
    service.config.menuMode = 'overlay';
    expect(service.isOverlay()).toBe(true);

    service.config.menuMode = 'static';
    expect(service.isOverlay()).toBe(false);
  });
});
