import { MenuItem } from 'primeng/api';

export interface IContextMenuProps {
  items: MenuItem[];
  global?: boolean;
  appendTo?: string | HTMLElement;
  autoZIndex?: boolean;
  baseZIndex?: number;
  styleClass?: string;
  style?: Record<string, string>;
  triggerEvent?: string;
}

export interface IContextMenuEvent {
  originalEvent: MouseEvent;
  item: MenuItem;
}
