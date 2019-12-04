import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ImportExport, Add } from '@material-ui/icons';
import { MAX_UNITS } from 'appConstants';

const useStyles = makeStyles({
  group: {
    display: 'flex',
  },
  button: {
    marginRight: '0.5em',

    '&:last-child': {
      marginRight: 0,
    },
  },
  input: {
    display: 'none',
  },
});

const UploadButton = ({ onUpload, disabled }) => {
  const classes = useStyles();

  const submitFiles = (files) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new global.FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        onUpload(data);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <input
        accept="application/JSON"
        className={classes.input}
        id="upload-button"
        type="file"
        // eslint-disable-next-line no-param-reassign
        onChange={(event) => { submitFiles(event.target.files); event.target.value = null; }}
      />
      <label htmlFor="upload-button">
        <Button
          variant="contained"
          startIcon={<ImportExport />}
          color="primary"
          disabled={disabled}
          className={classes.button}
          component="span"
        >
        Import
        </Button>
      </label>
    </div>
  );
};

const AddUnitButton = ({ units, addUnit }) => {
  const classes = useStyles();

  const onUpload = (data) => {
    if (data && data.name && data.weapon_profiles) {
      addUnit(data.name, data.weapon_profiles);
    }
  };

  return (
    <div className={classes.group}>
      <Button
        fullWidth
        onClick={() => addUnit(`Unit ${units.length + 1}`)}
        variant="contained"
        startIcon={<Add />}
        color="primary"
        disabled={units.length >= MAX_UNITS}
        className={classes.button}
      >
        Add Unit
      </Button>
      <UploadButton onUpload={onUpload} disabled={units.length >= MAX_UNITS} />
    </div>
  );
};

export default AddUnitButton;
