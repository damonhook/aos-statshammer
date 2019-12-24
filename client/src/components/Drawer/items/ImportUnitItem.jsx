import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import { addUnit } from 'actions/units.action';
import { connect } from 'react-redux';
import { addNotification } from 'actions/notifications.action';
import Uploader from 'components/Uploader';
import { addUnitEnabled } from 'utils/unitHelpers';


const ImportUnitItem = ({
  // eslint-disable-next-line no-unused-vars
  numUnits, addNotification, addUnit, onClick,
}) => {
  /** Is the upload menu item disabled or not */
  const isUploadDisabled = !addUnitEnabled();

  /** The function to call when a file upload happens.
   * In this case that would be importing the uploaded unit data
   * @param {object} data the JSON from the uploaded unit
   * */
  const onUnitUpload = useCallback((data) => {
    if (data && data.name && data.weapon_profiles) {
      addNotification({ message: 'Successfully imported unit', variant: 'success' });
      addUnit(data.name, data.weapon_profiles);
    }
    if (onClick) onClick();
  }, [addNotification, addUnit, onClick]);

  return (
    <Uploader
      onUpload={onUnitUpload}
      disabled={isUploadDisabled}
      component={(
        <ListItem button disabled={isUploadDisabled}>
          <ListItemIcon><ImportExport /></ListItemIcon>
          <ListItemText primary="Import Unit" />
        </ListItem>
      )}
    />
  );
};

ImportUnitItem.defaultProps = {
  onClick: null,
};

ImportUnitItem.propTypes = {
  /** The current number of units. Used to ensure that the item is disabled when limit is reached */
  numUnits: PropTypes.number.isRequired,
  /** A callback function to call when the menu item is clicked */
  onClick: PropTypes.func,
  /** A function to call to add a notification to the stack */
  addNotification: PropTypes.func.isRequired,
  /** A function to call to add a new unit */
  addUnit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps, { addNotification, addUnit })(ImportUnitItem);
