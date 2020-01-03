import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Route } from 'react-router-dom';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { clearAllUnits } from 'actions/units.action';
import { connect } from 'react-redux';
import { addNotification } from 'actions/notifications.action';
import LinkItem from './LinkItem';

interface ClearUnitsItemProps {
  clearAllUnits: () => void;
  addNotification: (options: any) => void;
  onClick?: () => void;
}

const ClearUnitsItem: React.FC<ClearUnitsItemProps> = ({
  clearAllUnits,
  addNotification,
  onClick,
}) => {
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

export default connect(null, { clearAllUnits, addNotification })(ClearUnitsItem);
