import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FloatingButton from 'components/FloatingButton';
import AddIcon from '@material-ui/icons/Add';
import Link from 'components/Link';
import { IStore } from 'types/store';
import { HASHES } from 'utils/urls';

const mapStateToProps = (state: IStore) => ({ numModifiers: state.target.modifiers.length });
const connector = connect(mapStateToProps);
interface IAddModifiersFabProps extends ConnectedProps<typeof connector> {}

const AddModifiersFab: React.FC<IAddModifiersFabProps> = () => (
  <Link to={HASHES.MODIFIERS}>
    <FloatingButton icon={<AddIcon />} />
  </Link>
);

export default connector(AddModifiersFab);
