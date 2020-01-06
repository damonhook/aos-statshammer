import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FloatingButton from 'components/FloatingButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useHistory } from 'react-router-dom';
import { IStore } from 'types/store';

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

const connector = connect(mapStateToProps);
interface IExportPdfFabProps extends ConnectedProps<typeof connector> {
  numUnits: number;
}

const ExportPdfFab: React.FC<IExportPdfFabProps> = ({ numUnits }) => {
  const history = useHistory();
  return (
    <FloatingButton onClick={() => history.push('/pdf')} icon={<GetAppIcon />} disabled={numUnits <= 0} />
  );
};

export default connector(ExportPdfFab);
