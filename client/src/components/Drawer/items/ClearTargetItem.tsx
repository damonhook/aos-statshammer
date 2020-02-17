import { TrackChanges } from '@material-ui/icons';
import ConfirmationDialog from 'components/ConfirmationDialog';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { notificationsStore, targetStore } from 'store/slices';

import MenuLinkItem from '../MenuLinkItem';

interface IClearTargetItemProps {
  onClick?: () => void;
  mini?: boolean;
}

const ClearTargetItem = ({ onClick, mini }: IClearTargetItemProps) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(
      notificationsStore.actions.addNotification({ message: 'Target modifiers cleared', variant: 'info' }),
    );
    dispatch(targetStore.actions.clearAllTargetModifiers());
    if (onClick) onClick();
  };

  const handleClose = () => {
    if (onClick) onClick();
  };

  return (
    <div>
      <MenuLinkItem to="/target/confirm" label="Clear Target Modifiers" icon={<TrackChanges />} mini={mini} />
      <Route path="/target/confirm">
        <ConfirmationDialog
          open
          onConfirm={handleConfirm}
          onClose={handleClose}
          description="Are you sure you want to delete all target modifiers"
        />
      </Route>
    </div>
  );
};

export default ClearTargetItem;
