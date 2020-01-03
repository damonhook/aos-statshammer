import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { getMaxDamage, getMaxProbability, getTicks } from 'containers/ProbabilityCurves/probabilityUtils';
import GraphWrapper from './GraphWrapper';

const useStyles = makeStyles({
  graphGroup: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  line: {
    flex: 2,
  },
});

const ProbabilityGraphs = ({ probabilities, unitNames }) => {
  const classes = useStyles();
  const yAxisFormatter = useCallback(value => `${value}%`, []);
  const cols = 2;
  const rows = Math.ceil(probabilities.length / cols);

  let maxDamage = 0;
  let maxProbability = 0;
  let ticks: number[] | null = null;
  if (probabilities && probabilities.length) {
    maxDamage = getMaxDamage(probabilities);
    maxProbability = getMaxProbability(probabilities);
    if (maxProbability) {
      ticks = getTicks(maxProbability);
    }
  }

  return (
    <div>
      {[...Array(rows)].map((_, rowIndex) => (
        <GraphWrapper className="pdf-prob" height={380}>
          <div className={classes.graphGroup}>
            {[...Array(cols)].map((_, colIndex) => {
              const index = rowIndex * cols + colIndex;
              const item = probabilities[index];
              const { save, buckets } = item;
              return (
                <LineGraph
                  title={`Damage Probability (${save === 'None' ? '-' : `${save}+`})`}
                  key={save}
                  data={buckets}
                  isAnimationActive={false}
                  series={unitNames}
                  className={classes.line}
                  xAxis={{
                    domain: [0, maxDamage],
                    type: 'number',
                    dataKey: 'damage',
                    tickCount: 10,
                  }}
                  yAxis={{
                    tickFormatter: yAxisFormatter,
                    domain: [0, Math.ceil(maxProbability / 10) * 10],
                    type: 'number',
                    ticks,
                  }}
                  yAxisLabel={{
                    value: 'Probability (%)',
                    position: 'insideLeft',
                  }}
                  dotSize={0}
                />
              );
            })}
          </div>
        </GraphWrapper>
      ))}
    </div>
  );
};

export default ProbabilityGraphs;
