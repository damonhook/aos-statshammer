import React, {
  useMemo, useLayoutEffect, useCallback, useState,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import { useHistory } from 'react-router-dom';
import { useRefCallback } from 'hooks';
import { lightTheme } from 'themes';
import generate from './generator';
import PdfLoader from './PdfLoader';
import GraphWrapper from './GraphWrapper';


const useStyles = makeStyles(() => ({
  hidden: {
    width: '100%',
    position: 'absolute',
    left: -2000,
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

const PdfGenerator = ({ units, results, modifiers }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const unitNames = useMemo(() => units.map(({ name }) => name), [units]);

  const generatePdf = useCallback(() => (
    generate('pdf-copy', units, results, modifiers, unitNames)
  ), [modifiers, results, unitNames, units]);

  const refCallback = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Wait for recharts to finish drawing
  }, []);
  const [ref] = useRefCallback(refCallback);

  useLayoutEffect(() => {
    if (!loading) {
      generatePdf().then((result) => {
        setDoc(result);
        if (mobile) {
          result.save('aos-statshammer.pdf');
          history.goBack();
        }
      });
    }
  }, [generatePdf, history, loading, mobile]);

  if (doc) {
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    return <iframe src={doc.output('datauristring')} className={classes.iframe} />;
  }

  return (
    <div>
      {loading && <PdfLoader />}
      <ThemeProvider theme={lightTheme}>
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
      </ThemeProvider>
    </div>
  );
};

PdfGenerator.propTypes = {
  units: PropTypes.arrayOf(PropTypes.object).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PdfGenerator;
