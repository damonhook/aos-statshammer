import { GetApp as GetAppIcon } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { numUnitsSelector } from 'store/selectors';
import { ROUTES } from 'utils/urls';

import FloatingButton from '../FloatingButton';

const ExportPdfFab = () => {
  const numUnits = useSelector(numUnitsSelector);
  const history = useHistory();

  const handleClick = () => {
    history.push(ROUTES.PDF);
  };

  return <FloatingButton onClick={handleClick} icon={<GetAppIcon />} disabled={numUnits <= 0} />;
};

export default ExportPdfFab;
