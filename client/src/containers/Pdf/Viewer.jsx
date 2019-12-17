import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import { PDFViewer as ViewWrapper } from '@react-pdf/renderer';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import { lightTheme } from 'themes';
import ReactToPDF from './ReactToPDF';
import Pdf from './Pdf';

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
  hidden: {},
}));

const PDFViewer = ({
  pending, payload, nameMapping, fetchStatsCompare,
}) => {
  const classes = useStyles();
  const [barGraph, setBarGraph] = useState(null);
  const [lineGraph, setLineGraph] = useState(null);
  const [radarGraph, setRadarGraph] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!pending && !payload) {
      fetchStatsCompare();
    } else if (payload && payload.length) {
      const mappedResults = applyMapping(nameMapping, payload);
      setResults(mappedResults);
    }
  }, [pending, payload, fetchStatsCompare, nameMapping]);

  if (!results || !results.length) return null;

  const unitNames = Object.values(nameMapping);
  const images = [barGraph, lineGraph, radarGraph];
  return (
    <div>
      {(images && images.length)
        && (
          <div className={classes.pdfContainer}>
            <div className={classes.inner}>
              <ViewWrapper width="100%" height="100%">
                <Pdf images={images} results={results} unitNames={unitNames} />
              </ViewWrapper>
            </div>
          </div>
        )}
      <div className={classes.hidden}>
        <ThemeProvider theme={lightTheme}>
          <ReactToPDF callback={setBarGraph} height={300} width={700} stretch>
            <BarGraph
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
            />
          </ReactToPDF>
          <ReactToPDF callback={setLineGraph} height={300} width={700} stretch>
            <LineGraph
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
            />
          </ReactToPDF>
          <ReactToPDF callback={setRadarGraph} height={300} width={700} stretch>
            <RadarGraph
              isAnimationActive={false}
              unitNames={unitNames}
              results={results}
              outerRadius={90}
            />
          </ReactToPDF>
        </ThemeProvider>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nameMapping: state.units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {}),
  pending: state.stats.pending,
  payload: state.stats.payload,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PDFViewer);
