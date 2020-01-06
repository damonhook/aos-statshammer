import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Route } from 'react-router-dom';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { connect, ConnectedProps } from 'react-redux';
import { notifications, target } from 'store/slices';
import LinkItem from './LinkItem';

const mapDispatchToProps = {
  clearAllTargetModifiers: target.actions.clearAllTargetModifiers,
  addNotification: notifications.actions.addNotification,
};

const connector = connect(null, mapDispatchToProps);
interface ClearTargetItemProps extends ConnectedProps<typeof connector> {
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

export default connector(ClearTargetItem);
