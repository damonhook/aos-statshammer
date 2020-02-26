export interface IPickedFile {
  id: string;
  serviceId: string;
  mimeType: string;
  description: string;
  type: string;
  lastEditedUtc: number;
  iconUrl: string;
  url: string;
  embedUrl: string;
  driveSuccess: boolean;
  sizeBytes: number;
  parentId: string;
}

export interface IDrivePickerAction {
  action: string;
  docs?: IPickedFile[];
}

export interface IDriveUploadMetadata {
  appProperties?: { [k: string]: any };
  contentHints?: {
    indexableText?: string;
    thumbnail?: { image?: string; mimeType?: string };
  };
  copyRequiresWriterPermission?: boolean;
  createdTime?: number;
  description?: string;
  folderColorRgb?: string;
  id?: string;
  mimeType?: string;
  modifiedTime?: number;
  name?: string;
  originalFilename?: string;
  parents?: string[];
  properties?: { [k: string]: any };
  starred?: boolean;
  viewedByMeTime?: number;
  writersCanShare?: boolean;
}
