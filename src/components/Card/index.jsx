import React from 'react';
import './index.scss';


const CardHeader = ({ children, ...other }) => (
  <div className="header" {...other}>
    {children}
  </div>
);

const CardBody = ({ children, ...other }) => (
  <div className="body" {...other}>
    {children}
  </div>
);

const Card = ({ children, className, ...other }) => (
  <div className={`card ${className}`} {...other}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
