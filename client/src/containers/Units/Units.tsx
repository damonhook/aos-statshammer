import { Button, Grid, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Add, ImportExport } from '@material-ui/icons';
import clsx from 'clsx';
import Link from 'components/Link';
import NoItemsCard from 'components/NoItemsCard';
import ProfileDialog from 'containers/ProfileDialog';
import Unit from 'containers/Unit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { addUnitEnabledSelector, unitsSelector } from 'store/selectors';
import { unitsStore } from 'store/slices';
import { UNIT_SUBROUTES } from 'utils/urls';

const useStyles = makeStyles(() => ({
  units: {
    overflowX: 'hidden',
  },
}));

interface IUnitsProps {
  className?: string;
}

const Units = ({ className }: IUnitsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const units = useSelector(unitsSelector);

  const addUnitEnabled = useSelector(addUnitEnabledSelector);
  const dispatch = useDispatch();

  const handleaddUnit = () => {
    dispatch(unitsStore.actions.addUnit({ unit: { name: `Unit ${units.length + 1}` } }));
  };

  return (
    <div className={clsx(classes.units, className)}>
      {!units?.length && (
        <NoItemsCard header="It's lonely here" body="There are no units here, try adding some" />
      )}
      {units.map((unit, index) => (
        <Unit unit={unit} id={index} key={unit.uuid} />
      ))}
      {!mobile && (
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Button
              fullWidth
              onClick={handleaddUnit}
              variant="contained"
              startIcon={<Add />}
              color="primary"
              disabled={!addUnitEnabled}
            >
              Add Unit
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Link to={UNIT_SUBROUTES.IMPORT}>
              <Button
                variant="contained"
                startIcon={<ImportExport />}
                color="primary"
                disabled={!addUnitEnabled}
                fullWidth
              >
                Import
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
      <Route path="/units/:unitUuid/:profileIndex">
        <ProfileDialog open />
      </Route>
    </div>
  );
};

export default Units;
