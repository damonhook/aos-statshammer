import { Button, CircularProgress } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { useGoogleApi } from 'hooks';
import React from 'react';
import { IDrivePickerAction } from 'types/gdrive';

const DRIVE_API = 'https://www.googleapis.com/drive/v2';

interface IGoogleFilePickerProps {
  onFilesPicked: (data: string[]) => void;
  mimeType?: string;
}

const GoogleFilePicker = ({ onFilesPicked, mimeType = 'application/json' }: IGoogleFilePickerProps) => {
  const { ready, checkAuth, gapi, pickerBuilder, picker } = useGoogleApi();

  const onDownloaded = (data: IDrivePickerAction) => {
    if (!data?.docs) return;
    Promise.all(
      data.docs.map(doc =>
        gapi.client.request({ path: `${DRIVE_API}/files/${doc.id}?alt=media` }).then(res => res.body),
      ),
    ).then(results => {
      onFilesPicked(results);
    });
  };

  const createPicker = () => {
    checkAuth(() => {
      if (ready) {
        pickerBuilder()
          .addView(
            new picker.DocsView(picker.ViewId.DOCS)
              .setMimeTypes(mimeType)
              .setIncludeFolders(true)
              .setParent('root'),
          )
          .setSelectableMimeTypes(mimeType)
          .setCallback(onDownloaded)
          .build()
          .setVisible(true);
      }
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
      startIcon={ready ? <CloudDownload /> : <CircularProgress size={22} color="inherit" />}
      fullWidth
    >
      Google Drive
    </Button>
  );
};

export default GoogleFilePicker;
