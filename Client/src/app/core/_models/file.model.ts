export interface IFile {
  id: string;
  fileName: string;
  originalFileName: string;
  contentType: string;
  size: number;
  createdAt: string;
}

export interface IFileList {
  files: IFile[];
}
