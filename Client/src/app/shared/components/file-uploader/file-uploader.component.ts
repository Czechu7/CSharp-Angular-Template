import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { IFileUploadMode, IFileUploadProps } from '../../types/fileUploader.types';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  standalone: true,
  imports: [FileUploadModule, CommonModule],
})
export class FileUploaderComponent implements IFileUploadProps {
  @Input() url = '';
  @Input() multiple = true;
  @Input() accept = 'image/*';
  @Input() maxFileSize = 1000000;
  @Input() mode: IFileUploadMode = 'basic';
  @Input() emptyMessage = 'Drag and drop files to here to upload.';
  @Input() name = 'files';
  @Input() auto = false;
  @Input() showCancelButton = true;
  @Input() showUploadButton = true;
  @Input() chooseLabel = 'Choose';
  @Input() uploadLabel = 'Upload';
  @Input() cancelLabel = 'Cancel';
  @Input() useService = true;

  @Output() onFileUpload = new EventEmitter<File[]>();
  uploadedFiles: File[] = [];

  onUpload(event: { files: File[] }) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.onFileUpload.emit(event.files);
  }

  onUploadHandler(event: { files: File[] }) {
    const files = event.files;
    this.onFileUpload.emit(files);
  }

  clearUploadedFiles() {
    this.uploadedFiles = [];
  }
}
