import React from 'react';
import { connect } from 'react-redux';
import FloatingButton from 'components/FloatingButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useHistory } from 'react-router-dom';

const ExportPdfFab = ({ numUnits }) => {
  const history = useHistory();
  return (
    <FloatingButton
      onClick={() => history.push('/pdf')}
      icon={<GetAppIcon />}
      disabled={numUnits <= 0}
    />
  );
};

const mapStateToProps = (state) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps)(ExportPdfFab);
