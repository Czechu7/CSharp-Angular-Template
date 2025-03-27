import { HttpEvent } from '@angular/common/http';

export type IFileUploadMode = 'basic' | 'advanced';

export interface IFileUploadProps {
  url: string;
  multiple: boolean;
  accept: string;
  maxFileSize: number;
  mode: IFileUploadMode;
  emptyMessage: string;
  name: string;
  auto?: boolean;
  showCancelButton?: boolean;
  showUploadButton?: boolean;
  chooseLabel: string;
  uploadLabel: string;
  cancelLabel: string;
}

export interface IUploadEvent {
  originalEvent: HttpEvent<unknown>;
  files: File[];
}
