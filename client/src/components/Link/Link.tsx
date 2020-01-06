// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';

const Link = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit',
});

export default Link;
