import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import { addUnit } from 'actions/units.action';
import { connect } from 'react-redux';
import { addNotification } from 'actions/notifications.action';
import Uploader from 'components/Uploader';
import { addUnitEnabled } from 'utils/unitHelpers';

const useStyles = makeStyles((theme) => ({
  menu: {},
  icon: {
    color: theme.palette.primary.contrastText,
  },
  caption: {
    paddingBottom: theme.spacing(1),
  },
  menuItemIcon: {
    marginRight: theme.spacing(1),
  },
}));


const ImportUnitItem = ({
  // eslint-disable-next-line no-unused-vars
  numUnits, onClick, addNotification, addUnit,
}) => {
  const classes = useStyles();

  /** Is the upload menu item disabled or not */
  const isUploadDisabled = !addUnitEnabled();

  /** The function to call when a file upload happens.
   * In this case that would be importing the uploaded unit data
   * @param {object} data the JSON from the uploaded unit
   * */
  const onUnitUpload = useCallback((data) => {
    if (data && data.name && data.weapon_profiles) {
      onClick();
      addNotification({ message: 'Successfully imported unit', variant: 'success' });
      addUnit(data.name, data.weapon_profiles);
    }
  }, [addNotification, addUnit, onClick]);

  return (
    <Uploader
      onUpload={onUnitUpload}
      disabled={isUploadDisabled}
      component={(
        <MenuItem disabled={isUploadDisabled}>
          <ImportExport className={classes.menuItemIcon} />
          Import Unit
        </MenuItem>
      )}
    />
  );
};

ImportUnitItem.propTypes = {
  /** The current number of units. Used to ensure that the item is disabled when limit is reached */
  numUnits: PropTypes.number.isRequired,
  /** A callback function to call when the menu item is clicked */
  onClick: PropTypes.func.isRequired,
  /** A function to call to add a notification to the stack */
  addNotification: PropTypes.func.isRequired,
  /** A function to call to add a new unit */
  addUnit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps, { addNotification, addUnit })(ImportUnitItem);
