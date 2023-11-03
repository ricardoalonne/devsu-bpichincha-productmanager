import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-dsbn-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService, public el: ElementRef) {}

  ngOnInit() {
    this.model = [
      {
        nameOption: 'Home',
        iconName: 'home',
        redirectTo: '/',
        type: 'option',
      },
      {
        type: 'separator',
      },
      {
        nameOption: 'Productos',
        iconName: 'box',
        redirectTo: 'products',
        type: 'option',
      },
      {
        type: 'separator',
      },
      {
        nameOption: 'GitHub',
        iconName: 'share',
        redirectTo:
          'https://github.com/ricardoalonne/devsu-bpichincha-productmanager',
        type: 'link',
      },
    ];
  }
}
