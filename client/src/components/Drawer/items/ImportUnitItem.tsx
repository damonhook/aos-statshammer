import React, { useCallback } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import { connect, ConnectedProps } from 'react-redux';
import Uploader from 'components/Uploader';
import { addUnitEnabled } from 'utils/unitHelpers';
import { IStore } from 'types/store';
import { notifications, units } from 'store/slices';

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});
const mapDispatchToProps = {
  addNotification: notifications.actions.addNotification,
  addUnit: units.actions.addUnit,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface ImportUnitItemProps extends ConnectedProps<typeof connector> {
  onClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImportUnitItem: React.FC<ImportUnitItemProps> = ({ numUnits, addNotification, addUnit, onClick }) => {
  /** Is the upload menu item disabled or not */
  const isUploadDisabled = !addUnitEnabled();

  /** The function to call when a file upload happens.
   * In this case that would be importing the uploaded unit data
   * @param {object} data the JSON from the uploaded unit
   * */
  const onUnitUpload = useCallback(
    data => {
      if (data && data.name && data.weapon_profiles) {
        addNotification({ message: 'Successfully imported unit', variant: 'success' });
        addUnit({ unit: data });
      }
      if (onClick) onClick();
    },
    [addNotification, addUnit, onClick],
  );

  return (
    <Uploader
      onUpload={onUnitUpload}
      disabled={isUploadDisabled}
      component={
        <ListItem button disabled={isUploadDisabled}>
          <ListItemIcon>
            <ImportExport />
          </ListItemIcon>
          <ListItemText primary="Import Unit" />
        </ListItem>
      }
    />
  );
};

export default connector(ImportUnitItem);
