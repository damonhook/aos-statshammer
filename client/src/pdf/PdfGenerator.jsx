import React, {
  useMemo, useLayoutEffect, useCallback, useState,
} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useRefCallback } from 'hooks';
import generate from './generate';


const useStyles = makeStyles(() => ({
  hidden: {
    width: '100%',
    position: 'absolute',
    left: -2000,
  },
  container: {
    // width: '100%',
    width: '1000px',
    height: '100%',
  },
  graph: {
    height: '400px',
  },
  graphGroup: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  line: {
    flex: 2,
  },
  radar: {
    flex: 1,
  },
  iframe: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
  },
}));

const GraphWrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.container, 'pdf-copy')}>
      <div className={classes.graph}>
        {children}
      </div>
    </div>
  );
};


const PdfGenerator = ({ units, results, modifiers }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  const mobile = theme.breakpoints.down('sm');
  const unitNames = useMemo(() => units.map(({ name }) => name), [units]);

  const generatePdf = useCallback(() => (
    generate('pdf-copy', units, results, modifiers, unitNames)
  ), [modifiers, results, unitNames, units]);

  const refCallback = useCallback((node) => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);
  const [ref] = useRefCallback(refCallback);

  useLayoutEffect(() => {
    if (!loading) {
      setTimeout(() => {
        generatePdf().then((result) => {
          setDoc(result);
          if (mobile) {
            result.save('aos-statshammer.pdf');
            history.goBack();
          }
        });
      }, 1000);
    }
  }, [generatePdf, history, loading, mobile]);

  if (doc) {
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    return <iframe src={doc.output('datauristring')} className={classes.iframe} />;
  }

  return (
    <div>
      <div className={classes.hidden} ref={ref}>
        <GraphWrapper>
          <BarGraph isAnimationActive={false} unitNames={unitNames} results={results} />
        </GraphWrapper>
        <GraphWrapper>
          <div className={classes.graphGroup}>
            <LineGraph
              className={classes.line}
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
            />
            <RadarGraph
              className={classes.radar}
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
            />
          </div>
        </GraphWrapper>
      </div>
    </div>
  );
};

export default PdfGenerator;
