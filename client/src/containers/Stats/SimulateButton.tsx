import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '@material-ui/core';
import { fetchSimulations } from 'api';

const connector = connect(null, { fetchSimulations });
interface ISimulateButton extends ConnectedProps<typeof connector> {}

const SimulateButton: React.FC<ISimulateButton> = ({ fetchSimulations }) => {
  const handleClick = () => {
    fetchSimulations();
  };

  return (
    <Button fullWidth color="primary" onClick={handleClick} variant="contained">
      Simulate
    </Button>
  );
};

export default connector(SimulateButton);
