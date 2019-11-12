import React from "react";
import "./index.scss";


const Card = ({children, className}) => (
  <div className={`card ${className}`}>
    {children}
  </div>
)


export default Card
