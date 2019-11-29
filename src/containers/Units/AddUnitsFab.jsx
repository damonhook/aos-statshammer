import React from 'react';
import { connect } from 'react-redux';
import { addUnit } from 'actions/units.action';
import FloatingButton from 'components/FloatingButton';
import { Add } from '@material-ui/icons';

const AddUnitsFab = ({ units, addUnit }) => (
  <FloatingButton
    onClick={() => addUnit(`Unit ${units.length + 1}`)}
    icon={<Add />}
    disabled={units.length >= 4}
  />
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { addUnit })(AddUnitsFab);
