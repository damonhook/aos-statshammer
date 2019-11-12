import React from 'react';
import Card from 'components/Card';

const Modifier = ({ id, name, characteristic, description, options }) => (
  <Card className="modifier">
    <div className="modifier-title">
      {name}
    </div>
    <div className="modifier-description">
      {description}
    </div>
  </Card>
)

export default Modifier
