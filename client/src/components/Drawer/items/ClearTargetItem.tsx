import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Route } from 'react-router-dom';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { clearAllTargetModifiers } from 'actions/target.action';
import { connect } from 'react-redux';
import { addNotification } from 'actions/notifications.action';
import LinkItem from './LinkItem';

interface ClearTargetItemProps {
  clearAllTargetModifiers: () => void;
  addNotification: (options: any) => void;
  onClick?: () => void;
}

const ClearTargetItem: React.FC<ClearTargetItemProps> = ({
  clearAllTargetModifiers,
  addNotification,
  onClick,
}) => {
  const handleConfirm = () => {
    addNotification({ message: 'Target modifiers cleared', variant: 'info' });
    clearAllTargetModifiers();
    if (onClick) onClick();
  };

  const handleClose = () => {
    if (onClick) onClick();
  };

  return (
    <div>
      <LinkItem to="/target/confirm">
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <ListItemText primary="Clear Target Modifiers" />
      </LinkItem>
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

export default connect(null, { clearAllTargetModifiers, addNotification })(ClearTargetItem);
