import { makeStyles } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { getMaxDamage, getMaxProbability, getTicks } from 'containers/ProbabilityCurves/probabilityUtils';
import React, { useCallback } from 'react';
import { ISimulationResult } from 'types/simulations';

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

interface IProbabilityGraphsProps {
  probabilities: ISimulationResult[];
  unitNames: string[];
}
const ProbabilityGraphs = ({ probabilities, unitNames }: IProbabilityGraphsProps) => {
  const classes = useStyles();
  const yAxisFormatter = useCallback(value => `${value}%`, []);
  const cols = 2;
  const rows = Math.ceil(probabilities.length / cols);

  let maxDamage = 0;
  let maxProbability = 0;
  let ticks: number[];
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
        // eslint-disable-next-line react/no-array-index-key
        <GraphWrapper className="pdf-prob" height={380} key={rowIndex}>
          <div className={classes.graphGroup}>
            {[...Array(cols)].map((_, colIndex) => {
              const index = rowIndex * cols + colIndex;
              const item = probabilities[index];
              const { save, discrete } = item;
              return (
                <LineGraph
                  title={`Damage Probability (${save ? '-' : `${save}+`})`}
                  key={save}
                  data={discrete}
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
