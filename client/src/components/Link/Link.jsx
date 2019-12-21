import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';


const Link = styled(RouterLink)(({
  theme,
}) => ({
  textDecoration: 'none',
  color: 'inherit',
}));


export default Link;
