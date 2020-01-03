import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchModifiers } from 'api';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import { IModifiersStore, IStore } from 'types/store';

interface IModifiersSubscriberProps {
  modifiers: IModifiersStore;
  fetchModifiers: () => void;
}

/**
 * A component that is subscribed to the redux store and will fetch the modifier definitions
 * if they do not exist
 */
const ModifiersSubscriber: React.FC<IModifiersSubscriberProps> = ({ modifiers, fetchModifiers }) => {
  const [debouncedUseEffect] = useDebouncedCallback(() => {
    if (!modifiers.pending && (!modifiers.modifiers || !modifiers.modifiers.length)) {
      fetchModifiers();
    }
  }, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    debouncedUseEffect();
  });

  return <span style={{ display: 'none' }} />;
};

const mapStateToProps = (state: IStore) => ({ modifiers: state.modifiers });

export default connect(mapStateToProps, { fetchModifiers })(ModifiersSubscriber);
