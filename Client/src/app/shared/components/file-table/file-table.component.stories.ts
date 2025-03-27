import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Observable, of } from 'rxjs';
import { IFileItem } from '../../types/file-type.types';
import { ButtonComponent } from '../button/button.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { InputComponent } from '../input/input.component';
import { FileTableComponent } from './file-table.component';

class MockTranslateService {
  get(key: string): Observable<string> {
    return of(key);
  }

  instant(key: string): string {
    const translations: Record<string, string> = {
      'FILE_TABLE.SEARCH_PLACEHOLDER': 'Search files...',
      'FILE_TABLE.REFRESH': 'Refresh',
      'FILE_TABLE.NAME': 'Name',
      'FILE_TABLE.TYPE': 'Type',
      'FILE_TABLE.SIZE': 'Size',
      'FILE_TABLE.LAST_MODIFIED': 'Last Modified',
      'FILE_TABLE.ACTIONS': 'Actions',
      'FILE_TABLE.DOWNLOAD': 'Download',
      'FILE_TABLE.PREVIEW': 'Preview',
      'FILE_TABLE.DELETE': 'Delete',
      'FILE_TABLE.NO_FILES': 'No files found',
    };
    return translations[key] || key;
  }

  onLangChange = of({ lang: 'en' });
}

const mockFiles: IFileItem[] = [
  {
    id: '1',
    name: 'Project Report.pdf',
    type: 'pdf',
    size: 2500000,
    lastModified: new Date('2023-12-15T14:30:00'),
  },
  {
    id: '2',
    name: 'Financial Statement.xlsx',
    type: 'xlsx',
    size: 1200000,
    lastModified: new Date('2023-12-10T09:15:00'),
  },
  {
    id: '3',
    name: 'Presentation.pptx',
    type: 'pptx',
    size: 3800000,
    lastModified: new Date('2023-12-05T16:45:00'),
  },
  {
    id: '4',
    name: 'Meeting Notes.docx',
    type: 'docx',
    size: 500000,
    lastModified: new Date('2023-12-20T11:00:00'),
  },
  {
    id: '5',
    name: 'Company Logo.png',
    type: 'png',
    size: 250000,
    lastModified: new Date('2023-11-28T13:20:00'),
  },
];

const manyFiles: IFileItem[] = Array(30)
  .fill(null)
  .map((_, index) => ({
    id: `file-${index + 1}`,
    name: `File ${index + 1}.${['pdf', 'docx', 'xlsx', 'png', 'txt'][index % 5]}`,
    type: ['pdf', 'docx', 'xlsx', 'png', 'txt'][index % 5],
    size: Math.floor(Math.random() * 5000000),
    lastModified: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  }));

const meta: Meta<FileTableComponent> = {
  title: 'Components/FileTable',
  component: FileTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TableModule,
        TooltipModule,
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ButtonComponent,
        InputComponent,
        ContextMenuComponent,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: TranslateService, useClass: MockTranslateService }],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A file table component with search, pagination, and action buttons',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    files: {
      description: 'Array of file items to display',
      control: 'object',
    },
    enablePagination: {
      description: 'Whether to enable pagination',
      control: 'boolean',
    },
    rowsPerPage: {
      description: 'Number of rows to display per page',
      control: { type: 'number', min: 1, max: 50 },
    },
    showActions: {
      description: 'Whether to show action buttons for each file',
      control: 'boolean',
    },
    showSearchBar: {
      description: 'Whether to show the search bar',
      control: 'boolean',
    },
    showActionButtons: {
      description: 'Whether to show top action buttons (e.g. Refresh)',
      control: 'boolean',
    },
    defaultSortField: {
      description: 'Default field to sort by',
      control: 'select',
      options: ['name', 'type', 'size', 'lastModified'],
    },
    defaultSortOrder: {
      description: 'Default sort order (1 for ascending, -1 for descending)',
      control: 'select',
      options: [1, -1],
    },
    loading: {
      description: 'Whether the table is in loading state',
      control: 'boolean',
    },
    totalRecords: {
      description: 'Total number of records (for server-side pagination)',
      control: 'number',
    },
    paginatorPosition: {
      description: 'Position of the paginator',
      control: 'select',
      options: ['top', 'bottom', 'both'],
    },
    onPageChange: { action: 'pageChanged' },
    fileAction: { action: 'fileAction' },
  },
};

export default meta;
type Story = StoryObj<FileTableComponent>;

export const Default: Story = {
  args: {
    files: mockFiles,
    enablePagination: true,
    rowsPerPage: 10,
    showActions: true,
    showSearchBar: true,
    showActionButtons: true,
    defaultSortField: 'name',
    defaultSortOrder: 1,
    loading: false,
    totalRecords: mockFiles.length,
    paginatorPosition: 'bottom',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default configuration with all features enabled',
      },
    },
  },
};

export const WithoutPagination: Story = {
  args: {
    ...Default.args,
    enablePagination: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table without pagination',
      },
    },
  },
};

export const WithoutActions: Story = {
  args: {
    ...Default.args,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table without action buttons',
      },
    },
  },
};

export const WithoutSearch: Story = {
  args: {
    ...Default.args,
    showSearchBar: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table without search functionality',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table in loading state',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    files: [],
    totalRecords: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table with no files',
      },
    },
  },
};

export const WithManyFiles: Story = {
  args: {
    ...Default.args,
    files: manyFiles,
    totalRecords: manyFiles.length,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table with many files to demonstrate pagination',
      },
    },
  },
};

export const PaginatorOnTop: Story = {
  args: {
    ...Default.args,
    files: manyFiles,
    totalRecords: manyFiles.length,
    paginatorPosition: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: 'File table with paginator at the top',
      },
    },
  },
};

export const PaginatorOnBoth: Story = {
  args: {
    ...Default.args,
    files: manyFiles,
    totalRecords: manyFiles.length,
    paginatorPosition: 'both',
  },
  parameters: {
    docs: {
      description: {
        story: 'File table with paginator at both top and bottom',
      },
    },
  },
};

export const SortBySize: Story = {
  args: {
    ...Default.args,
    defaultSortField: 'size',
    defaultSortOrder: -1,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table initially sorted by file size (descending)',
      },
    },
  },
};

export const SortByDate: Story = {
  args: {
    ...Default.args,
    defaultSortField: 'lastModified',
    defaultSortOrder: -1,
  },
  parameters: {
    docs: {
      description: {
        story: 'File table initially sorted by last modified date (most recent first)',
      },
    },
  },
};

export const WithEventHandlers: Story = {
  args: {
    ...Default.args,
    onPageChange: action('Page changed'),
    fileAction: action('File action'),
  },
  parameters: {
    docs: {
      description: {
        story: 'File table with event handlers to demonstrate events',
      },
    },
  },
};
