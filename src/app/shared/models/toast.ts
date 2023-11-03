import { copyValuesToObject } from '../utils/api-model-converter.util';

export class Toast {
  title!: string;
  description!: string;
  iconName?: string;
  severity!: 'success' | 'info' | 'warn' | 'error';
  autoClosing: boolean = false;

  constructor(data?: {
    title?: string;
    description?: string;
    iconName?: string;
    severity?: 'success' | 'info' | 'warn' | 'error';
    autoClosing?: boolean;
  }) {
    if (data) {
      copyValuesToObject(data, this);
    }
  }
}
