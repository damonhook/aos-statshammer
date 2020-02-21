import { Button } from '@material-ui/core';
import { fetchSimulations } from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

const SimulateButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchSimulations());
  };

  return (
    <Button fullWidth color="primary" onClick={handleClick} variant="contained">
      Simulate
    </Button>
  );
};

export default SimulateButton;
