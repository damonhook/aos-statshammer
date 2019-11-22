import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import ModifierOption from './ModifierOption';
import './index.scss';

const ModifierSelector = ({
  modifiers, pending, error, onClick,
}) => {
  const [open, setOpen] = useState(false);
  const addModifier = (modifier) => {
    onClick(modifier);
    setOpen(false);
  };

  if (pending) {
    return (
      <div className="modifier-selector">
        <Button content="Add Modifier" fluid disabled loading />
      </div>
    );
  }
  if (error || !modifiers || !modifiers.length) {
    return null;
  }
  return (
    <div className="modifier-selector">
      {open
        ? (
          <div>
            <Button icon="cancel" content="Cancel" fluid negative onClick={() => setOpen(false)} />
            <div className="modifier-options">
              {modifiers.map((modifier) => (
                <ModifierOption modifier={modifier} onClick={addModifier} />
              ))}
            </div>
          </div>
        )
        : <Button icon="add" content="Add Modifier" fluid onClick={() => setOpen(true)} />}
    </div>
  );
};


const mapStateToProps = (state) => ({
  ...state.modifiers,
});

export default connect(mapStateToProps)(ModifierSelector);
