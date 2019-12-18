import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRefCallback } from 'hooks';
import html2canvas from 'html2canvas';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: ({ height, stretch }) => ({
    background: 'white',
    height: `${height}px`,
    padding: theme.spacing(2),
    width: stretch ? 'min-content' : '100%',
  }),
  inner: ({ width, stretch }) => ({
    width: width !== 'auto' ? `${width}px` : 'auto',
    height: '100%',
    margin: stretch ? 0 : 'auto',
  }),
}));

const ReactToPDF = ({
  children, height, width, callback, stretch,
}) => {
  const classes = useStyles({ height, width, stretch });
  const refCallback = useCallback((node) => {
    setTimeout(() => {
      html2canvas(node).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        callback(imgData);
      });
    }, 400);
  }, [callback]);

  const [ref] = useRefCallback(refCallback);

  return (
    <div ref={ref} className={classes.container}>
      <div className={classes.inner}>
        {children}
      </div>
    </div>
  );
};

ReactToPDF.defaultProps = {
  width: 'auto',
  stretch: false,
};

ReactToPDF.propTypes = {
  /** The child react component to convert to an image */
  children: PropTypes.node.isRequired,
  /** The height in px to render the child components in */
  height: PropTypes.number.isRequired,
  /** An optional width to render the child components at */
  width: PropTypes.number,
  /** The callback function to call with the generated image URL */
  callback: PropTypes.func.isRequired,
  /** Whether to stretch the image or not */
  stretch: PropTypes.bool,
};

export default ReactToPDF;
