import React from 'react';
import { Add as AddIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { HASHES } from 'utils/urls';
import FloatingButton from '../FloatingButton';

const AddTargetModifierFab = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push(HASHES.MODIFIERS);
  };

  return <FloatingButton onClick={handleClick} icon={<AddIcon />} />;
};

export default AddTargetModifierFab;
