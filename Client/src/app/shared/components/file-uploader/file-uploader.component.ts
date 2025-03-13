import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { IFileUploadMode, IFileUploadProps, IUploadEvent } from '../../types/fileUploader.types';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  standalone: true,
  imports: [FileUpload, CommonModule],
})
export class FileUploaderComponent implements IFileUploadProps {
  @Input() url = '';
  @Input() multiple = true;
  @Input() accept = 'image/*';
  @Input() maxFileSize = 1000000;
  @Input() mode: IFileUploadMode = 'advanced';
  @Input() emptyMessage = 'Drag and drop files to here to upload.';
  @Input() name = 'demo[]';
  @Input() auto = false;
  @Input() showCancelButton = true;
  @Input() showUploadButton = true;

  @Output() onFileUpload = new EventEmitter<File[]>();
  uploadedFiles: File[] = [];

  onUpload(event: IUploadEvent) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.onFileUpload.emit(event.files);
  }

  clearUploadedFiles() {
    this.uploadedFiles = [];
  }
}
