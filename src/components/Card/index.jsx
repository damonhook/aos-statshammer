import React from "react";
import "./index.scss";


const Card = ({ children, className, ...other }) => (
  <div className={`card ${className}`} {...other}>
    {children}
  </div>
)


export default Card
