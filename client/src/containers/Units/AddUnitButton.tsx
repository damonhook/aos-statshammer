import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, ImportExport } from '@material-ui/icons';
import Link from 'components/Link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitEnabledSelector } from 'store/selectors';
import { unitsStore } from 'store/slices';
import { IUnitStore } from 'types/store';
import { ROUTES } from 'utils/urls';

const useStyles = makeStyles({
  group: {
    display: 'flex',
  },
  button: {
    marginRight: '0.5em',

    '&:last-child': {
      marginRight: 0,
    },
  },
});

interface IAddUnitButtonProps {
  units: IUnitStore;
}

const AddUnitButton = ({ units }: IAddUnitButtonProps) => {
  const classes = useStyles();
  const addUnitEnabled = useSelector(addUnitEnabledSelector);
  const dispatch = useDispatch();

  const handleaddUnit = () => {
    dispatch(unitsStore.actions.addUnit({ unit: { name: `Unit ${units.length + 1}` } }));
  };

  return (
    <div className={classes.group}>
      <Button
        fullWidth
        onClick={handleaddUnit}
        variant="contained"
        startIcon={<Add />}
        color="primary"
        disabled={!addUnitEnabled}
        className={classes.button}
      >
        Add Unit
      </Button>
      <Link to={ROUTES.IMPORT}>
        <Button
          variant="contained"
          startIcon={<ImportExport />}
          color="primary"
          disabled={!addUnitEnabled}
          className={classes.button}
        >
          Import
        </Button>
      </Link>
    </div>
  );
};

export default AddUnitButton;
