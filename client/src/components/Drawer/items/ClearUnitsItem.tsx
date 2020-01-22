import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Route } from 'react-router-dom';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { units, notifications } from 'store/slices';
import { connect, ConnectedProps } from 'react-redux';
import LinkItem from './LinkItem';

const mapDispatchToProps = {
  clearAllUnits: units.actions.clearAllUnits,
  addNotification: notifications.actions.addNotification,
};

const connector = connect(null, mapDispatchToProps);
interface ClearUnitsItemProps extends ConnectedProps<typeof connector> {
  onClick?: () => void;
}

const ClearUnitsItem: React.FC<ClearUnitsItemProps> = ({ clearAllUnits, addNotification, onClick }) => {
  const handleConfirm = () => {
    addNotification({ message: 'All units cleared', variant: 'info' });
    clearAllUnits();
    if (onClick) onClick();
  };

  const handleClose = () => {
    if (onClick) onClick();
  };

  return (
    <div>
      <LinkItem to="/units/confirm">
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText primary="Clear All Units" />
      </LinkItem>
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

export default connector(ClearUnitsItem);
