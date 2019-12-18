import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare, fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { PDFViewer as ViewWrapper } from '@react-pdf/renderer';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import { lightTheme } from 'themes';
import ReactToPDF from 'pdf/components/ReactToPDF';
import Pdf from 'pdf/document';
import 'pdf/font';

const applyMapping = (mapping, results) => (
  results.map((result) => Object.keys(result).reduce((acc, key) => {
    if (key == null || key === 'save') return acc;
    const name = mapping[key];
    if (name) acc[name] = result[key];
    return acc;
  }, { save: result.save }))
);

const useStyles = makeStyles(() => ({
  pdfContainer: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
  },
  inner: {
    flex: 1,
    height: '100%',
  },
  hidden: {
    position: 'absolute',
    left: -2000,
  },
}));

const PDFViewer = ({
  pending, payload, units, modifiers, modifiersPending, fetchStatsCompare, fetchModifiers,
}) => {
  const classes = useStyles();
  const [barGraph, setBarGraph] = useState(null);
  const [lineGraph, setLineGraph] = useState(null);
  const [radarGraph, setRadarGraph] = useState(null);
  const [results, setResults] = useState(null);

  const nameMapping = useMemo(() => (
    units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {})
  ), [units]);

  useEffect(() => {
    if (!pending && (!payload || !payload.length)) {
      fetchStatsCompare();
    } else if (payload && payload.length) {
      const mappedResults = applyMapping(nameMapping, payload);
      setResults(mappedResults);
    }
  }, [pending, payload, fetchStatsCompare, nameMapping]);

  useEffect(() => {
    if (!modifiersPending && (!modifiers || !modifiers.length)) {
      fetchModifiers();
    }
  }, [fetchModifiers, modifiers, modifiersPending]);

  if (!results || !results.length) return null;

  const unitNames = Object.values(nameMapping);
  const images = [barGraph, lineGraph, radarGraph].filter((image) => image != null);
  const loaded = modifiers && modifiers.length && images && images.length;
  return (
    <div>
      {loaded
        ? (
          <div className={classes.pdfContainer}>
            <div className={classes.inner}>
              <ViewWrapper width="100%" height="100%">
                <Pdf images={images} results={results} units={units} />
              </ViewWrapper>
            </div>
          </div>
        )
        : null}
      <div className={classes.hidden}>
        <ThemeProvider theme={lightTheme}>
          <ReactToPDF callback={setBarGraph} height={350} width={900} stretch>
            <BarGraph
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
            />
          </ReactToPDF>
          <ReactToPDF callback={setLineGraph} height={350} width={900} stretch>
            <LineGraph
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
            />
          </ReactToPDF>
          <ReactToPDF callback={setRadarGraph} height={350} width={900} stretch>
            <RadarGraph
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
              outerRadius={95}
            />
          </ReactToPDF>
        </ThemeProvider>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  pending: state.stats.pending,
  payload: state.stats.payload,
  modifiersPending: state.modifiers.pending,
  modifiers: state.modifiers.modifiers,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
  fetchModifiers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PDFViewer);
