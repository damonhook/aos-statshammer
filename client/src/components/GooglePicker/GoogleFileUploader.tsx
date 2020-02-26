import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Folder, InsertDriveFile } from '@material-ui/icons';
import { useGoogleApi } from 'context/useGoogleApi';
import React from 'react';
import { IDrivePickerAction, IDriveUploadMetadata } from 'types/gdrive';

const DRIVE_API = 'https://www.googleapis.com/upload/drive/v3';
const BOUNDARY_KEY = 'multipart_boundary';

const useStyles = makeStyles((theme: Theme) => ({
  alt: {
    margin: theme.spacing(1, 0),
  },
  divider: {
    flex: 1,
  },
}));

interface IGoogleFileUploaderProps {
  mimeType?: string;
  fileName: string;
  data: object;
  onUpload?: (error: string | undefined) => void;
}

const GoogleFileUploader = ({
  fileName,
  data,
  mimeType = 'application/json',
  onUpload,
}: IGoogleFileUploaderProps) => {
  const classes = useStyles();
  const { ready, checkAuth, gapi, pickerBuilder, picker } = useGoogleApi();

  const getRequestMetadata = (folderId?: string): IDriveUploadMetadata => {
    const metadata: IDriveUploadMetadata = {
      name: fileName,
      mimeType,
    };
    if (folderId) metadata.parents = [folderId];
    return metadata;
  };

  const uploadFile = (folderId?: string) => {
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
      .then(() => {
        if (onUpload) onUpload(undefined);
      })
      .catch(err => {
        if (onUpload) onUpload(err?.body ?? 'Unexpected Error');
      });
  };

  const onFolderPicked = (folderData: IDrivePickerAction) => {
    if (!folderData?.docs?.length) return;
    const folderId = folderData.docs[0].id;
    uploadFile(folderId);
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
        .setTitle('Export Destination')
        .build()
        .setVisible(true);
    });
  };

  const handleFolderClick = () => {
    createPicker();
  };

  const handleRootClick = () => {
    uploadFile();
  };

  return (
    <Card>
      <CardHeader title="Upload to Google Drive" titleTypographyProps={{ align: 'center' }} />
      <CardContent>
        <Button
          onClick={handleFolderClick}
          disabled={!ready}
          size="large"
          variant="contained"
          color="primary"
          startIcon={ready ? <Folder /> : <CircularProgress size={22} color="inherit" />}
          fullWidth
        >
          Pick Folder
        </Button>
        <Grid container spacing={1} className={classes.alt} alignItems="center">
          <Grid item className={classes.divider}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography>OR</Typography>
          </Grid>
          <Grid item className={classes.divider}>
            <Divider />
          </Grid>
        </Grid>
        <Button
          onClick={handleRootClick}
          disabled={!ready}
          size="large"
          variant="contained"
          color="primary"
          startIcon={ready ? <InsertDriveFile /> : <CircularProgress size={22} color="inherit" />}
          fullWidth
        >
          Add at Root
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoogleFileUploader;
