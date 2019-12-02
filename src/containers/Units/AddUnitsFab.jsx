import React from 'react';
import { connect } from 'react-redux';
import { addUnit } from 'actions/units.action';
import FloatingButton from 'components/FloatingButton';
import AddIcon from '@material-ui/icons/Add';

const AddUnitsFab = ({ units, addUnit }) => (
  <FloatingButton
    onClick={() => addUnit(`Unit ${units.length + 1}`)}
    icon={<AddIcon />}
    disabled={units.length >= 5}
  />
);

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { addUnit })(AddUnitsFab);
