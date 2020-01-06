import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { units } from 'store/slices';
import FloatingButton from 'components/FloatingButton';
import AddIcon from '@material-ui/icons/Add';
import { addUnitEnabled } from 'utils/unitHelpers';
import { IStore } from 'types/store';

const mapStateToProps = (state: IStore) => ({ numUnits: state.units.length });

const connector = connect(mapStateToProps, { addUnit: units.actions.addUnit });
interface AddUnitsFabProps extends ConnectedProps<typeof connector> {}

const AddUnitsFab: React.FC<AddUnitsFabProps> = ({ numUnits, addUnit }) => (
  <FloatingButton
    onClick={() => addUnit({ name: `Unit ${numUnits + 1}` })}
    icon={<AddIcon />}
    disabled={!addUnitEnabled()}
  />
);

export default connector(AddUnitsFab);
