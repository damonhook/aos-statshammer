import React from 'react';
import { connect } from 'react-redux';
import { addUnit } from 'actions/units.action';
import FloatingButton from 'components/FloatingButton';
import AddIcon from '@material-ui/icons/Add';
import { addUnitEnabled } from 'utils/unitHelpers';

const AddUnitsFab = ({ numUnits, addUnit }) => (
  <FloatingButton
    onClick={() => addUnit(`Unit ${numUnits + 1}`)}
    icon={<AddIcon />}
    disabled={!addUnitEnabled()}
  />
);

const mapStateToProps = (state) => ({ numUnits: state.units.length });

export default connect(mapStateToProps, { addUnit })(AddUnitsFab);
