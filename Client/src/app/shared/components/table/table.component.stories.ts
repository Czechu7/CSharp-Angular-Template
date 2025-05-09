import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';
import { MenuItem } from 'primeng/api';

const meta: Meta<TableComponent> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],
  argTypes: {
    showGridlines: { control: { type: 'boolean' } },
    stripedRows: { control: { type: 'boolean' } },
    enablePaginator: { control: { type: 'boolean' } },
    enableResizableColumns: { control: { type: 'boolean' } },
    showActions: { control: { type: 'boolean' } },
    showSearchBar: { control: { type: 'boolean' } },
    showActionButtons: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
    paginatorPosition: {
      control: { type: 'select', options: ['top', 'bottom', 'both'] },
    },
  },
};

export default meta;
type TableStory = StoryObj<TableComponent>;

const sampleData = [
  { id: 1, name: 'Product A', category: 'Electronics', price: 299.99 },
  { id: 2, name: 'Product B', category: 'Books', price: 19.99 },
  { id: 3, name: 'Product C', category: 'Clothing', price: 49.99 },
  { id: 4, name: 'Product D', category: 'Home & Garden', price: 99.99 },
  { id: 5, name: 'Product E', category: 'Electronics', price: 599.99 },
  { id: 6, name: 'Product F', category: 'Books', price: 29.99 },
];

const sampleColumns = [
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'price', header: 'Price' },
];

const contextMenuItems: MenuItem[] = [
  { label: 'Download', icon: 'pi pi-download', command: () => {} },
  { label: 'View', icon: 'pi pi-eye', command: () => {} },
  { label: 'Delete', icon: 'pi pi-trash', command: () => {} },
];

export const Default: TableStory = {
  args: {
    cols: sampleColumns,
    data: sampleData,
    headerTitle: 'Products Table',
    footerTitle: 'Total products: 6',
    showGridlines: true,
    stripedRows: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    enablePaginator: true,
    enableResizableColumns: true,
    minWidth: '50rem',
    showActions: true,
    showSearchBar: true,
    showActionButtons: true,
    defaultSortField: 'name',
    defaultSortOrder: 1,
    loading: false,
    totalRecords: 6,
    paginatorPosition: 'bottom',
    contextMenuItems: contextMenuItems,
    actionButtons: [
      { icon: 'pi pi-download', ariaLabel: 'TABLE.DOWNLOAD', action: 'download' },
      { icon: 'pi pi-eye', ariaLabel: 'TABLE.PREVIEW', action: 'preview' },
      { icon: 'pi pi-trash', severity: 'danger', ariaLabel: 'TABLE.DELETE', action: 'delete' },
    ],
  },
};

export const NoGridlines: TableStory = {
  args: {
    ...Default.args,
    showGridlines: false,
    headerTitle: 'Table without Gridlines',
  },
};

export const NoStripes: TableStory = {
  args: {
    ...Default.args,
    stripedRows: false,
    headerTitle: 'Table without Stripes',
  },
};

export const NoActions: TableStory = {
  args: {
    ...Default.args,
    showActions: false,
    headerTitle: 'Table without Actions',
  },
};

export const NoSearchBar: TableStory = {
  args: {
    ...Default.args,
    showSearchBar: false,
    headerTitle: 'Table without Search Bar',
  },
};

export const LoadingState: TableStory = {
  args: {
    ...Default.args,
    loading: true,
    headerTitle: 'Table in Loading State',
  },
};

export const PaginatorOnTop: TableStory = {
  args: {
    ...Default.args,
    paginatorPosition: 'top',
    headerTitle: 'Table with Paginator on Top',
  },
};

export const PaginatorOnBoth: TableStory = {
  args: {
    ...Default.args,
    paginatorPosition: 'both',
    headerTitle: 'Table with Paginator on Both Ends',
  },
};
