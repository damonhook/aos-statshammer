import { ImportExport } from '@material-ui/icons';
import Uploader from 'components/Uploader';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitEnabledSelector } from 'store/selectors';
import { notifications as notificationsStore, units as unitsStore } from 'store/slices';

import MenuItem from '../MenuItem';

interface IImportUnitItemProps {
  onClick?: () => void;
  mini?: boolean;
}

const ImportUnitItem = ({ onClick, mini }: IImportUnitItemProps) => {
  const dispatch = useDispatch();
  const uploadEnabled = useSelector(addUnitEnabledSelector);

  /** The function to call when a file upload happens.
   * In this case that would be importing the uploaded unit data
   * @param {object} data the JSON from the uploaded unit
   * */
  const onUnitUpload = useCallback(
    data => {
      if (data && data.name && data.weapon_profiles) {
        dispatch(
          notificationsStore.actions.addNotification({
            message: 'Successfully imported unit',
            variant: 'success',
          }),
        );
        dispatch(unitsStore.actions.addUnit({ unit: data }));
      }
      if (onClick) onClick();
    },
    [dispatch, onClick],
  );

  return (
    <Uploader
      onUpload={onUnitUpload}
      disabled={!uploadEnabled}
      component={
        <MenuItem disabled={!uploadEnabled} label="Import Unit" icon={<ImportExport />} mini={mini} />
      }
    />
  );
};

export default ImportUnitItem;
