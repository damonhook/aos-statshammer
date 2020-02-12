import React from 'react';
import { useSelector } from 'react-redux';
import { getNumUnits } from 'store/selectors';
import { GetApp as GetAppIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'utils/urls';
import FloatingButton from '../FloatingButton';

const ExportPdfFab = () => {
  const numUnits = useSelector(getNumUnits);
  const history = useHistory();

  const handleClick = () => {
    history.push(ROUTES.PDF);
  };

  return <FloatingButton onClick={handleClick} icon={<GetAppIcon />} disabled={numUnits <= 0} />;
};

export default ExportPdfFab;