import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

const useStyles = makeStyles({
  card: {
    background: '#fff',
    borderRadius: '3px',
    webkitBoxShadow: '0 2px 2px 0 rgba(77, 77, 79, 0.08), 0 0 2px 0 rgba(77, 77, 79, 0.16)',
    boxShadow: '0 2px 2px 0 rgba(77, 77, 79, 0.08), 0 0 2px 0 rgba(77, 77, 79, 0.16)',
    display: 'flex',
    flexDirection: 'column',
  },
});

const Card = ({ children, className, ...other }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.card} ${className}`} {...other}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
