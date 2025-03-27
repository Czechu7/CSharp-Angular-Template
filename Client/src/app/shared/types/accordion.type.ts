import { TemplateRef } from '@angular/core';

export interface IAccordionPanelItem {
  value: string;
  header: string;
  contentTemplate: TemplateRef<unknown>;
}

export interface IAccordionProps {
  panels: IAccordionPanelItem[];
  activeItems: string[];
  allowMultiple: boolean;
}
