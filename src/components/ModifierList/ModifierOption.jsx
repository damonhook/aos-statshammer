import React from 'react';
import Card from 'components/Card';


const ModifierOption = ({ modifier, onClick }) => (
  <Card className="modifier-option" onClick={() => onClick(modifier)}>
    <Card.Body>
      <div className="modifier-title">
        <b>{modifier.name}</b>
      </div>
      <div className="modifier-description">
        {modifier.description}
      </div>
    </Card.Body>
  </Card>
);

export default ModifierOption;
