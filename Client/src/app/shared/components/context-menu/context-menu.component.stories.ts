import type { Meta, StoryObj } from '@storybook/angular';
import { ContextMenuComponent } from './context-menu.component';
import { IContextMenuProps } from '../../types/context-menu.types';

const meta: Meta<ContextMenuComponent> = {
  title: 'Components/ContextMenuComponent',
  component: ContextMenuComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Context menu component that can be triggered by right-clicking or custom events',
      },
    },
  },
  argTypes: {
    onShow: { action: 'onShow' },
    onHide: { action: 'onHide' },
    onItemSelect: { action: 'onItemSelect' },
  },
};

export default meta;

type ContextMenuStory = StoryObj<ContextMenuComponent> & {
  args: IContextMenuProps;
};

export const Basic: ContextMenuStory = {
  args: {
    items: [
      { label: 'Copy', icon: 'pi pi-copy' },
      { label: 'Paste', icon: 'pi pi-file-edit' },
    ],
    global: true,
  },
};

export const NestedMenu: ContextMenuStory = {
  args: {
    items: [
      {
        label: 'File',
        icon: 'pi pi-file',
        items: [
          { label: 'New', icon: 'pi pi-plus' },
          { label: 'Open', icon: 'pi pi-folder-open' },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        items: [
          { label: 'Cut', icon: 'pi pi-cut' },
          { label: 'Copy', icon: 'pi pi-copy' },
          { label: 'Paste', icon: 'pi pi-paste' },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
    ],
    global: true,
  },
};

export const CustomStyling: ContextMenuStory = {
  args: {
    items: [
      { label: 'View', icon: 'pi pi-eye' },
      { label: 'Edit', icon: 'pi pi-pencil' },
      { label: 'Share', icon: 'pi pi-share-alt' },
      { label: 'Delete', icon: 'pi pi-trash', disabled: true },
    ],
    global: true,
    styleClass: 'custom-context-menu',
  },
};

export const WithCommands: ContextMenuStory = {
  args: {
    items: [
      {
        label: 'Save',
        icon: 'pi pi-save',
        command: () => {
          console.log('Save command executed');
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          console.log('Delete command executed');
        },
      },
    ],
    global: true,
  },
};
