import { useMediaQuery } from '@material-ui/core';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import { useRefCallback } from 'hooks';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { lightTheme } from 'themes';
import { IJsPDF } from 'types/pdf';
import { ISimulationResult } from 'types/simulations';
import { TResult } from 'types/stats';
import { ITargetStore, IUnitStore } from 'types/store';

import generate from './generator';
import { CumulativeProbabilityGraphs, ProbabilityGraphs, StatsGraphs } from './graphs';
import PdfLoader from './PdfLoader';

const useStyles = makeStyles(() => ({
  pdfGenerator: {
    width: '100%',
  },
  hidden: {
    width: '100%',
    position: 'absolute',
    left: -2000,
  },
  iframe: {
    width: '100%',
    height: '100%',
  },
}));

interface IPdfGeneratorProps {
  units: IUnitStore;
  target: ITargetStore;
  results: TResult[];
  probabilities: ISimulationResult[];
}

const PdfGenerator: React.FC<IPdfGeneratorProps> = ({ units, target, results, probabilities }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [doc, setDoc] = useState<IJsPDF | null>(null);
  const [loading, setLoading] = useState(true);

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const unitNames = useMemo(() => units.map(({ name }) => name), [units]);

  const generatePdf = useCallback(
    () => generate(units, target, results, unitNames, 'pdf-copy', 'pdf-cumulative', 'pdf-prob'),
    [results, target, unitNames, units],
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
    return <iframe src={doc.output('datauristring')} className={classes.iframe} />;
  }

  return (
    <div className={classes.pdfGenerator}>
      <ThemeProvider theme={lightTheme}>
        <div className={classes.hidden} ref={ref}>
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
