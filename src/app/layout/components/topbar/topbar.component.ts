import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-dsbn-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  constructor(public layoutService: LayoutService) {}
}
