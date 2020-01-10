import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { getMaxDamage, getTicks } from 'containers/ProbabilityCurves/probabilityUtils';
import { IProbability } from 'types/simulations';
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

interface ICumulativeProbabilityGraphsProps {
  probabilities: IProbability[];
  unitNames: string[];
}

const CumulativeProbabilityGraphs: React.FC<ICumulativeProbabilityGraphsProps> = ({
  probabilities,
  unitNames,
}) => {
  const classes = useStyles();
  const yAxisFormatter = useCallback(value => `${value}%`, []);
  const cols = 2;
  const rows = Math.ceil(probabilities.length / cols);

  let maxDamage = 0;
  const ticks = getTicks(100);
  if (probabilities && probabilities.length) {
    maxDamage = getMaxDamage(probabilities);
  }

  return (
    <div>
      {[...Array(rows)].map((_, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <GraphWrapper className="pdf-cumulative" height={380} key={rowIndex}>
          <div className={classes.graphGroup}>
            {[...Array(cols)].map((_, colIndex) => {
              const index = rowIndex * cols + colIndex;
              const item = probabilities[index];
              const { save, cumulative } = item;
              return (
                <LineGraph
                  title={`Cumulative Damage Probability (${save === 'None' ? '-' : `${save}+`})`}
                  key={save}
                  data={cumulative}
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
                    domain: [0, 100],
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

export default CumulativeProbabilityGraphs;
