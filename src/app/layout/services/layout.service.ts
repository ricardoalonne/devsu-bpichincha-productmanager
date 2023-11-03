import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config.model';
import { LayoutState } from '../models/layout-state.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  state: LayoutState = {
    staticMenuDesktopInactive: false,
    profileSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  config: AppConfig = {
    menuMode: 'static',
  };

  private overlayOpen = new Subject<any>();

  overlayOpen$ = this.overlayOpen.asObservable();

  onMenuToggle() {
    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  isOverlay() {
    return this.config.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }
}
