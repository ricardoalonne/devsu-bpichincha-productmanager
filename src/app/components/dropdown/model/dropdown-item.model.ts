export interface DropdownItem {
  name: string;
  redirectTo: string;
  iconName: string;
  action: (data?: any) => void;
}
