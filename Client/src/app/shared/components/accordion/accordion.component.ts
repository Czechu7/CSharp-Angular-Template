import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { IAccordionPanelItem, IAccordionProps } from '../../types/accordion.type';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent implements IAccordionProps {
  @Input() panels: IAccordionPanelItem[] = [];
  @Input() activeItems: string[] = [];
  @Input() allowMultiple = true;
}
