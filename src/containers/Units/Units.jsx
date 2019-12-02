import React from 'react';
import { connect } from 'react-redux';
import Unit from 'containers/Unit';
import { addUnit } from 'actions/units.action';
import { Button, useMediaQuery } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  units: {
    marginBottom: '1em',
    flexGrow: 1,
    flexBasis: 0,
    [theme.breakpoints.down('sm')]: {
      marginBottom: '4em',
    },
  },
}));

const Units = ({ units, addUnit }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.units}>
      {units.map((unit, index) => (
        <Unit unit={unit} id={index} />
      ))}
      {!mobile && (
      <Button
        fullWidth
        onClick={() => addUnit(`Unit ${units.length + 1}`)}
        variant="contained"
        startIcon={<Add />}
        color="primary"
        disabled={units.length >= 5}
      >
        Add Unit
      </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { addUnit })(Units);
