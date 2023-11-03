import { Component, Input } from '@angular/core';

@Component({
  selector: 'google-icon',
  templateUrl: './google.icon.component.html',
  styleUrls: ['./google.icon.component.scss'],
})
export class GoogleIconComponent {
  @Input() iconType: 'rounded' | 'outlined' | 'sharp' = 'rounded';
  @Input() iconName!: string;
}
