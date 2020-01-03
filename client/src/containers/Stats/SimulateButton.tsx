import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { fetchSimulations } from 'api';

interface ISimulateButton {
  fetchSimulations: () => void;
}

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

export default connect(null, { fetchSimulations })(SimulateButton);
