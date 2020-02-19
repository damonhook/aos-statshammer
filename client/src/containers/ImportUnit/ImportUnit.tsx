import { Button, Dialog, DialogContent } from '@material-ui/core';
import GooglePicker from 'components/GooglePicker';
import React, { useEffect, useState } from 'react';
import { HASHES } from 'utils/urls';

const ImportUnit = () => {
  // const [gdriveActive, setGdriveActive] = useState(false);
  // const gdriveFileCallback = (data: any) => {
  //   console.log(data);
  //   const fileId = data?.docs?.[0]?.id;
  //   if (fileId) {
  //     fetch(`https://www.googleapis.com/drive/v2/files/${fileId}`).then(res => console.log(res));
  //   }
  // };
  // const handleGoogleDriveClicked = () => {
  //   setGdriveActive(true);
  // };
  // return (
  //   <div>
  //     <Button onClick={handleGoogleDriveClicked}>Google Drive</Button>
  //     {gdriveActive && <Picker callback={gdriveFileCallback} />}
  //   </div>
  // );
  return <GooglePicker />;
};

export default ImportUnit;
