import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';

const SimulateButton = ({ fetchSimulations }) => {
  const handleClick = () => {
    fetchSimulations();
  };

  return (
    <Button fullWidth color="primary" onClick={handleClick} variant="contained">Simulate</Button>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSimulations,
}, dispatch);

export default connect(null, mapDispatchToProps)(SimulateButton);
