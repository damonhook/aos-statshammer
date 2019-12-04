import React from 'react';
import { connect } from 'react-redux';
import Unit from 'containers/Unit';
import { addUnit } from 'actions/units.action';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddUnitButton from './AddUnitButton';

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
      {!mobile && <AddUnitButton units={units} addUnit={addUnit} />}
    </div>
  );
};

const mapStateToProps = (state) => ({ units: state.units });

export default connect(mapStateToProps, { addUnit })(Units);
