import nanoid from 'nanoid';
import React, { useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const globalAny: any = global;

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

interface IUploaderProps {
  onUpload: (data: any) => void;
  disabled?: boolean;
  component: React.ReactNode;
}

/**
 * A component used to open an upload dialog
 */
const Uploader: React.FC<IUploaderProps> = ({ onUpload, disabled = false, component }) => {
  const classes = useStyles();
  const id = useMemo(() => nanoid(), []);

  const submitFiles = useCallback(
    files => {
      if (!files) return;
      Array.from(files).forEach(file => {
        const reader = new globalAny.FileReader();
        reader.onload = () => {
          const data = JSON.parse(reader.result);
          onUpload(data);
        };
        reader.readAsText(file);
      });
    },
    [onUpload],
  );

  return (
    <div>
      <input
        accept="application/JSON"
        className={classes.input}
        id={`upload-button-${id}`}
        type="file"
        // eslint-disable-next-line no-param-reassign
        onChange={event => {
          submitFiles(event.target.files);
          event.target.value = '';
        }}
        disabled={disabled}
      />
      <label htmlFor={`upload-button-${id}`}>{component}</label>
    </div>
  );
};

export default Uploader;
