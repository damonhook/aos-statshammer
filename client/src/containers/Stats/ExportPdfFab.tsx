import React from 'react';
import { connect } from 'react-redux';
import FloatingButton from 'components/FloatingButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useHistory } from 'react-router-dom';
import { IStore } from 'types/store';

interface IExportPdfFabProps {
  numUnits: number;
}

const ExportPdfFab: React.FC<IExportPdfFabProps> = ({ numUnits }) => {
  const history = useHistory();
  return (
    <FloatingButton onClick={() => history.push('/pdf')} icon={<GetAppIcon />} disabled={numUnits <= 0} />
  );
};

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps)(ExportPdfFab);
