import React from 'react';
import { connect } from 'react-redux';
import Unit from 'containers/Unit';
import { addUnit } from 'actions/units.action';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import { Route } from 'react-router-dom';
import ProfileDialog from 'containers/ProfileDialog';
import _ from 'lodash';
import AddUnitButton from './AddUnitButton';
import { IStore, IUnitStore } from 'types/store';
import { IWeaponProfile } from 'types/unit';

const useStyles = makeStyles(theme => ({
  units: {
    marginBottom: '1em',
    flexGrow: 1,
    flexBasis: '50%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '4em',
    },
    overflowX: 'hidden',
  },
}));

interface UnitsProps {
  units: IUnitStore;
  addUnit: any;
  className?: string;
}

const Units: React.FC<UnitsProps> = React.memo(
  ({ units, addUnit, className }) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <div className={clsx(classes.units, className)}>
        {(!units || !units.length) && (
          <NoItemsCard header="It's lonely here" body="There are no units here, try adding some" />
        )}
        {units.map((unit, index) => (
          <Unit unit={unit} id={index} key={unit.uuid} />
        ))}
        {!mobile && <AddUnitButton units={units} addUnit={addUnit} />}
        <Route path="/units/:unitUuid/:profileIndex">
          <ProfileDialog open />
        </Route>
      </div>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

const mapStateToProps = (state: IStore) => ({ units: state.units });

export default connect(mapStateToProps, { addUnit })(Units);
