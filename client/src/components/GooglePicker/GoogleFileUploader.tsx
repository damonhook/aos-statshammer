import { Button, CircularProgress } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { useGoogleApi } from 'hooks';
import React from 'react';
import { IDrivePickerAction, IDriveUploadMetadata } from 'types/gdrive';

const DRIVE_API = 'https://www.googleapis.com/upload/drive/v3';
const BOUNDARY_KEY = 'multipart_boundary';

interface IGoogleFileUploaderProps {
  mimeType?: string;
  fileName: string;
  data: object;
}

const GoogleFileUploader = ({ fileName, data, mimeType = 'application/json' }: IGoogleFileUploaderProps) => {
  const { ready, checkAuth, gapi, pickerBuilder, picker } = useGoogleApi();

  const getRequestMetadata = (folderId?: string): IDriveUploadMetadata => {
    const metadata: IDriveUploadMetadata = {
      name: fileName,
      mimeType,
    };
    if (folderId) metadata.parents = [folderId];
    return metadata;
  };

  const onFolderPicked = (folderData: IDrivePickerAction) => {
    if (!folderData?.docs?.length) return;
    const folderId = folderData.docs[0].id;
    const metadata = getRequestMetadata(folderId);

    const body = `
      \n--${BOUNDARY_KEY}\
      \nContent-Type: application/json; charset=UTF-8\
      \n\n${JSON.stringify(metadata)}\
      \n--${BOUNDARY_KEY}\
      \nContent-Type: ${mimeType}\
      \n\n${JSON.stringify(data)}\
      \n--${BOUNDARY_KEY}--`;

    gapi.client
      .request({
        method: 'POST',
        path: `${DRIVE_API}/files?uploadType=multipart`,
        headers: { 'Content-Type': `multipart/related; boundary=${BOUNDARY_KEY}` },
        body,
      })
      .then(res => res.body);
  };

  const createPicker = () => {
    checkAuth(() => {
      pickerBuilder()
        .addView(
          new picker.DocsView(picker.ViewId.FOLDERS)
            .setMimeTypes('application/vnd.google-apps.folder')
            .setSelectFolderEnabled(true)
            .setIncludeFolders(true)
            .setParent('root'),
        )
        .setCallback(onFolderPicked)
        .build()
        .setVisible(true);
    });
  };

  const handleClick = () => {
    createPicker();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!ready}
      size="large"
      variant="contained"
      color="primary"
      startIcon={ready ? <CloudUpload /> : <CircularProgress size={22} color="inherit" />}
      fullWidth
    >
      Pick Folder
    </Button>
  );
};

export default GoogleFileUploader;
