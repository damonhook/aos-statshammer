import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import ProfileDialog from 'containers/ProfileDialog';
import Unit from 'containers/Unit';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { unitsSelector } from 'store/selectors';

import AddUnitButton from './AddUnitButton';

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

  return (
    <div className={clsx(classes.units, className)}>
      {!units?.length && (
        <NoItemsCard header="It's lonely here" body="There are no units here, try adding some" />
      )}
      {units.map((unit, index) => (
        <Unit unit={unit} id={index} key={unit.uuid} />
      ))}
      {!mobile && <AddUnitButton units={units} />}
      <Route path="/units/:unitUuid/:profileIndex">
        <ProfileDialog open />
      </Route>
    </div>
  );
};

export default Units;
