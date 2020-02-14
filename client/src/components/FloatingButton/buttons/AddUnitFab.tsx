import { Add as AddIcon } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUnitEnabledSelector, numUnitsSelector } from 'store/selectors';
import { units as unitsStore } from 'store/slices';

import FloatingButton from '../FloatingButton';

const AddUnitFab = () => {
  const numUnits = useSelector(numUnitsSelector);
  const enabled = useSelector(addUnitEnabledSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(unitsStore.actions.addUnit({ unit: { name: `Unit ${numUnits + 1}` } }));
  };

  return <FloatingButton onClick={handleClick} icon={<AddIcon />} disabled={!enabled} />;
};

export default AddUnitFab;
