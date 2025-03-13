import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { IContextMenuProps, IContextMenuEvent } from '../../types/context-menu.types';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule, ContextMenu],
  templateUrl: './context-menu.component.html',
})
export class ContextMenuComponent implements IContextMenuProps {
  @Input() items: MenuItem[] = [];
  @Input() global = false;
  @Input() appendTo: string | HTMLElement = 'body';
  @Input() autoZIndex = true;
  @Input() baseZIndex = 0;
  @Input() styleClass = '';
  @Input() style: Record<string, string> = {};
  @Input() triggerEvent = 'contextmenu';

  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();
  @Output() onItemSelect = new EventEmitter<IContextMenuEvent>();

  @ViewChild('cm') contextMenu!: ContextMenu;

  show(event: MouseEvent): void {
    if (this.contextMenu) {
      this.contextMenu.show(event);
    }
  }

  hide(): void {
    if (this.contextMenu) {
      this.contextMenu.hide();
    }
  }

  setTarget(target: HTMLElement): void {
    if (this.contextMenu) {
      this.contextMenu.target = target;
    }
  }

  onContextMenu(event: MouseEvent): void {
    this.show(event);
    event.preventDefault();
  }

  handleShow(): void {
    this.onShow.emit();
  }

  handleHide(): void {
    this.onHide.emit();
  }

  handleItemSelect(event: IContextMenuEvent): void {
    this.onItemSelect.emit(event);
  }
}
