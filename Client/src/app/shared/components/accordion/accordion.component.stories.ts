import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';

@Component({
  selector: 'storybook-accordion-wrapper',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  template: `
    <ng-template #defaultTemplate let-item>
      <div class="p-3">
        <p>{{ item.value }}</p>
      </div>
    </ng-template>

    <ng-template #richTemplate let-item>
      <div class="p-4 border-1 border-round">
        <h3>{{ item.header }}</h3>
        <p>{{ item.value }}</p>
        <button class="mt-2 p-button p-button-sm">{{ buttonText }}</button>
      </div>
    </ng-template>

    <app-accordion
      [panels]="processedPanels"
      [activeItems]="activeItems"
      [allowMultiple]="allowMultiple"
    >
    </app-accordion>
  `,
})
class AccordionWrapperComponent {
  @ViewChild('defaultTemplate', { static: true }) defaultTemplate!: TemplateRef<{
    item: { value: string };
  }>;
  @ViewChild('richTemplate', { static: true }) richTemplate!: TemplateRef<{
    item: { value: string };
  }>;

  panels: { header: string; value: string; useRichTemplate?: boolean }[] = [];
  activeItems: string[] = [];
  allowMultiple = true;
  buttonText = 'Click me';

  get processedPanels() {
    return this.panels.map(panel => ({
      header: panel.header,
      value: panel.value,
      contentTemplate: panel.useRichTemplate ? this.richTemplate : this.defaultTemplate,
    }));
  }
}

const meta: Meta<AccordionWrapperComponent> = {
  title: 'Components/Accordion',
  component: AccordionWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, AccordionComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'An accordion component that allows toggling between open and closed states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    panels: {
      description: 'The panels to display in the accordion',
      control: 'object',
    },
    activeItems: {
      description: 'The headers of panels that should be expanded',
      control: 'object',
    },
    allowMultiple: {
      description: 'Whether multiple panels can be expanded at once',
      control: 'boolean',
    },
    buttonText: {
      description: 'Text for buttons in rich template panels',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionWrapperComponent>;

export const Default: Story = {
  args: {
    panels: [
      { header: 'Section 1', value: 'Content for section 1' },
      { header: 'Section 2', value: 'Content for section 2' },
      { header: 'Section 3', value: 'Content for section 3' },
    ],
    activeItems: ['Section 1'],
    allowMultiple: true,
  },
};

export const WithRichContent: Story = {
  args: {
    panels: [
      {
        header: 'First Panel',
        value: 'This panel uses a rich template with additional styling',
        useRichTemplate: true,
      },
      {
        header: 'Second Panel',
        value: 'This panel also uses the rich template with a button',
        useRichTemplate: true,
      },
      { header: 'Third Panel', value: 'Back to a simple template', useRichTemplate: false },
    ],
    activeItems: ['First Panel'],
    allowMultiple: true,
    buttonText: 'Learn more',
  },
};

export const SingleSelectionMode: Story = {
  args: {
    panels: [
      { header: 'First Panel', value: 'Content for the first panel' },
      { header: 'Second Panel', value: 'Content for the second panel' },
      { header: 'Third Panel', value: 'Content for the third panel' },
    ],
    activeItems: ['Second Panel'],
    allowMultiple: false,
  },
};

export const MultipleExpanded: Story = {
  args: {
    panels: [
      { header: 'Panel One', value: 'Content for panel one' },
      { header: 'Panel Two', value: 'Content for panel two' },
      { header: 'Panel Three', value: 'Content for panel three' },
    ],
    activeItems: ['Panel One', 'Panel Three'],
    allowMultiple: true,
  },
};
