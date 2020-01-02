import React, { useCallback } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import { addUnit } from 'actions/units.action';
import { connect } from 'react-redux';
import { addNotification } from 'actions/notifications.action';
import Uploader from 'components/Uploader';
import { addUnitEnabled } from 'utils/unitHelpers';
import { IStore } from 'types/store';

interface ImportUnitItemProps {
  numUnits: number;
  addNotification: any;
  addUnit: any;
  onClick?: () => void;
}

const ImportUnitItem: React.FC<ImportUnitItemProps> = ({
  // eslint-disable-next-line no-unused-vars
  numUnits,
  addNotification,
  addUnit,
  onClick,
}) => {
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
        addUnit(data.name, data.weapon_profiles);
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

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps, { addNotification, addUnit })(ImportUnitItem);
