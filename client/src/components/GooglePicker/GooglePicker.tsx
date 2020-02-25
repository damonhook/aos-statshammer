import { Button } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { useGoogleApi } from 'hooks';
import React from 'react';
import { IDrivePickerAction } from 'types/gdrive';

const DRIVE_API = 'https://www.googleapis.com/drive/v2';

interface IGooglePickerProps {
  onUpload: (data: any) => void;
}

const GooglePicker = ({ onUpload }: IGooglePickerProps) => {
  const { state: gapiState, doAuth, gapi, createPicker } = useGoogleApi();

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

  const disabled = gapiState === 'loading' || gapiState === 'error';

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      size="large"
      variant="contained"
      color="primary"
      startIcon={<CloudDownload />}
      fullWidth
    >
      Google Drive
    </Button>
  );
};

export default GooglePicker;
