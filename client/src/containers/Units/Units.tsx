import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import ProfileDialog from 'containers/ProfileDialog';
import Unit from 'containers/Unit';
import _ from 'lodash';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route } from 'react-router-dom';
import { IStore } from 'types/store';

import AddUnitButton from './AddUnitButton';

const useStyles = makeStyles(() => ({
  units: {
    overflowX: 'hidden',
  },
}));

const mapStateToProps = (state: IStore) => ({ units: state.units });

const connector = connect(mapStateToProps);
interface UnitsProps extends ConnectedProps<typeof connector> {
  className?: string;
}

const Units: React.FC<UnitsProps> = React.memo(
  ({ units, className }) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

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
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default connector(Units);
