import { Delete } from '@material-ui/icons';
import ConfirmationDialog from 'components/ConfirmationDialog';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { notifications as notificationsStore, units as unitsStore } from 'store/slices';

import MenuLinkItem from '../MenuLinkItem';

interface IClearUnitsItemProps {
  onClick?: () => void;
  mini?: boolean;
}

const ClearUnitsItem = ({ onClick, mini }: IClearUnitsItemProps) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(notificationsStore.actions.addNotification({ message: 'All units cleared', variant: 'info' }));
    dispatch(unitsStore.actions.clearAllUnits());
    if (onClick) onClick();
  };

  const handleClose = () => {
    if (onClick) onClick();
  };

  return (
    <div>
      <MenuLinkItem to="/units/confirm" label="Clear Units" icon={<Delete />} mini={mini} />
      <Route path="/units/confirm">
        <ConfirmationDialog
          open
          onConfirm={handleConfirm}
          onClose={handleClose}
          description="Are you sure you want to delete all units"
        />
      </Route>
    </div>
  );
};

export default ClearUnitsItem;
