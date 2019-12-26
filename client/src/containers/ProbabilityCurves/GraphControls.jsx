import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem, TextField, FormControlLabel, Switch,
} from '@material-ui/core';
import _ from 'lodash';
import clsx from 'clsx';
import { REFERENCE_LINE_OPTIONS } from './probabilityUtils';

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    padding: theme.spacing(2, 2, 2, 0),
    marginBottom: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    marginTop: '-0.7rem',
  },
  select: {
    flex: 1,
  },
  label: {
    position: 'relative',
    left: theme.spacing(2),
    background: theme.palette.background.paper,
    fontSize: theme.typography.body2.fontSize,
  },
  selectInfo: {
  },
  field: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

const GraphControls = React.memo(({
  activeReferenceLine, setActiveReferenceLine, matchXAxis, setMatchXAxis,
}) => {
  const classes = useStyles();

  const handleReferenceLineChanged = (event) => {
    setActiveReferenceLine(event.target.value);
  };

  const handleSetMatchXAxisChanged = (event) => {
    setMatchXAxis(event.target.checked);
  };

  return (
    <>
      <span className={classes.label}>Graph Settings</span>
      <div className={classes.controls}>
        <FormControlLabel
          label="Match X Axis"
          labelPlacement="start"
          className={classes.field}
          control={
            <Switch checked={matchXAxis} onChange={handleSetMatchXAxisChanged} />
          }
        />
        <TextField
          select
          variant="filled"
          value={activeReferenceLine}
          onChange={handleReferenceLineChanged}
          label="Reference Lines"
          className={clsx(classes.field, classes.select)}
        >
          {Object.values(REFERENCE_LINE_OPTIONS).map((option) => (
            <MenuItem value={option} key={option}>{option}</MenuItem>
          ))}
        </TextField>
      </div>
    </>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default GraphControls;