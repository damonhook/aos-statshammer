import React, { useMemo, useLayoutEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useRefCallback } from 'hooks';
import { lightTheme } from 'themes';
import generate from './generator';
import PdfLoader from './PdfLoader';
import { StatsGraphs, ProbabilityGraphs, CumulativeProbabilityGraphs } from './graphs';
import { IUnitStore, ITargetStore } from 'types/store';
import { IModifierDefinition } from 'types/modifiers';

const useStyles = makeStyles(() => ({
  hidden: {
    width: '100%',
    position: 'absolute',
    left: -2000,
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

interface IPdfGeneratorProps {
  units: IUnitStore;
  target: ITargetStore;
  results: any[];
  modifiers: IModifierDefinition[];
  probabilities: any[];
}

const PdfGenerator: React.FC<IPdfGeneratorProps> = ({ units, target, results, modifiers, probabilities }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const unitNames = useMemo(() => units.map(({ name }) => name), [units]);

  const generatePdf = useCallback(
    () => generate(units, target, results, modifiers, unitNames, 'pdf-copy', 'pdf-cumulative', 'pdf-prob'),
    [modifiers, results, target, unitNames, units],
  );

  const refCallback = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Wait for recharts to finish drawing
  }, []);
  const [ref] = useRefCallback(refCallback);

  useLayoutEffect(() => {
    if (!loading) {
      generatePdf().then(result => {
        setDoc(result);
        if (mobile) {
          result.save('aos-statshammer.pdf');
          history.goBack();
        }
      });
    }
  }, [generatePdf, history, loading, mobile]);

  if (doc !== null && doc) {
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    //@ts-ignore
    return <iframe src={doc.output('datauristring')} className={classes.iframe} />;
  }

  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <div className={classes.hidden}>
          <StatsGraphs results={results} unitNames={unitNames} />
          <CumulativeProbabilityGraphs probabilities={probabilities} unitNames={unitNames} />
          <ProbabilityGraphs probabilities={probabilities} unitNames={unitNames} />
        </div>
      </ThemeProvider>
      <PdfLoader />
    </div>
  );
};

export default PdfGenerator;
