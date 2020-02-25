import { Button, CircularProgress } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { useGoogleApi } from 'hooks';
import React from 'react';
import { IDrivePickerAction } from 'types/gdrive';

const DRIVE_API = 'https://www.googleapis.com/drive/v2';

interface IGooglePickerProps {
  onUpload: (data: any) => void;
}

const GooglePicker = ({ onUpload }: IGooglePickerProps) => {
  const { ready, doAuth, gapi, createPicker } = useGoogleApi();

  const onAuthed = () => {
    const picker = createPicker('import', (data: IDrivePickerAction) => {
      if (!data?.docs) return;
      const promiseMap = data.docs.map(doc =>
        gapi.client.request({ path: `${DRIVE_API}/files/${doc.id}?alt=media` }).then(res => res.body),
      );
      Promise.all(promiseMap).then(results => {
        onUpload(results);
      });
    });
    picker.setVisible(true);
  };

  const handleClick = () => {
    doAuth(onAuthed);
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

export default GooglePicker;
