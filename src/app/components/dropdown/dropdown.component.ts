import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DropdownItem } from './model/dropdown-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;

  @Input() name!: string;
  @Input() iconName!: string;
  @Input() items: DropdownItem[] | any[] = [];
  @Input() data: any;
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';

  isDropdownOpen: boolean = false;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e) => {
      if (this.dropdown && !this.dropdown.nativeElement.contains(e.target))
        this.isDropdownOpen = false;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(item: DropdownItem) {
    if (item.action) item.action(this.data);
    if (item.redirectTo) this.router.navigate([item.redirectTo]);
    this.isDropdownOpen = false;
  }

  get dropdownClass() {
    return {
      'dropdown-active': this.isDropdownOpen,
    };
  }

  get dropdownContentClass() {
    return {
      'dropdown-content-horizontal': this.orientation === 'horizontal',
    };
  }
}
