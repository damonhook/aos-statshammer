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
