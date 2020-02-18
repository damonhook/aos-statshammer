import { Button, Dialog, DialogContent } from '@material-ui/core';
import { useGooglePicker, useHashMatch } from 'hooks';
import React, { useEffect, useState } from 'react';
import { HASHES } from 'utils/urls';

interface IPickerProps {
  callback: (data: any) => void;
}
const Picker = ({ callback }: IPickerProps) => {
  const { isReady, setVisible } = useGooglePicker(callback);

  useEffect(() => {
    if (isReady) setVisible(true);
  }, [isReady, setVisible]);

  return <div />;
};

const ImportUnit = () => {
  const [gdriveActive, setGdriveActive] = useState(false);

  const gdriveFileCallback = (data: any) => {
    console.log(data);
    const fileId = data?.docs?.[0]?.id;
    if (fileId) {
      fetch(`https://www.googleapis.com/drive/v2/files/${fileId}`).then(res => console.log(res));
    }
  };

  const handleGoogleDriveClicked = () => {
    setGdriveActive(true);
  };

  return (
    <div>
      <Button onClick={handleGoogleDriveClicked}>Google Drive</Button>
      {gdriveActive && <Picker callback={gdriveFileCallback} />}
    </div>
  );
};

export default ImportUnit;
