import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

const Uploader = ({ onUpload, disabled, component }) => {
  const classes = useStyles();

  const submitFiles = useCallback((files) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new global.FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result);
        onUpload(data);
      };
      reader.readAsText(file);
    });
  }, [onUpload]);

  return (
    <div>
      <input
        accept="application/JSON"
        className={classes.input}
        id="upload-button"
        type="file"
        // eslint-disable-next-line no-param-reassign
        onChange={(event) => { submitFiles(event.target.files); event.target.value = null; }}
        disabled={disabled}
      />
      <label htmlFor="upload-button">
        {component}
      </label>
    </div>
  );
};

Uploader.defaultProps = {
  disabled: false,
};

Uploader.propTypes = {
  /** A callback function to call when a file it uploaded */
  onUpload: PropTypes.func.isRequired,
  /** Whether the uploader is disabled or not */
  disabled: PropTypes.bool,
  /** The component to render in the place of the uploader (e.g: Upload button) */
  component: PropTypes.node.isRequired,
};

export default Uploader;
