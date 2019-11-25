import React from 'react';
import { connect } from 'react-redux';
import Unit from 'containers/Unit';
import { addUnit } from 'actions/units.action';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  units: {
    marginBottom: '1em',
  },
});

const Units = ({ units, addUnit }) => {
  const classes = useStyles();
  return (
    <div className={classes.units}>
      {units.map((unit, index) => (
        <Unit unit={unit} id={index} />
      ))}
      <Button
        fullWidth
        onClick={() => addUnit(`Unit ${units.length + 1}`)}
        variant="contained"
        startIcon={<Add />}
      >
      Add Unit
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { addUnit })(Units);
