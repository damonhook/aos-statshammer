import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import BasicCurves from './BasicCurves';
import CumulativeCurves from './CumulativeCurves';

const useStyles = makeStyles((theme) => ({
}));

const ProbabilityCurves = React.memo(({
  pending, probabilities, unitNames, className, error,
}) => {
  const classes = useStyles();

  return (
    <div>
      <BasicCurves
        probabilities={probabilities}
        unitNames={unitNames}
        className={className}
        error={error}
        pending={pending}
      />
      <CumulativeCurves
        probabilities={probabilities}
        unitNames={unitNames}
        className={className}
        error={error}
        pending={pending}
      />
    </div>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default ProbabilityCurves;
