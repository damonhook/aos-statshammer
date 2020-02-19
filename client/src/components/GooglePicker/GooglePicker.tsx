import { Button } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import { useGoogleApi } from 'hooks';
import React from 'react';

const GooglePicker = () => {
  const { state: gapiState, doAuth, gapi, createPicker } = useGoogleApi();

  const onAuthed = () => {
    const picker = createPicker('import', (data: any) => {
      const fileId = data?.docs?.[0]?.id;
      if (fileId) {
        gapi.client
          .request({
            path: `https://www.googleapis.com/drive/v2/files/${fileId}?alt=media`,
          })
          .then(res => alert(res.body));
      }
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
      style={{ margin: '2em' }}
      variant="contained"
      color="primary"
      startIcon={<ImportExport />}
    >
      Google Drive
    </Button>
  );
};

export default GooglePicker;
