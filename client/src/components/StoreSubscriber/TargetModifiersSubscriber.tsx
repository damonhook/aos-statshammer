import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTargetModifiers } from 'api';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import { ITargetModifiersStore, IStore } from 'types/store';

interface ITargetModifiersSubscriberProps {
  modifiers: ITargetModifiersStore;
  fetchTargetModifiers: () => void;
}

/**
 * A component that is subscribed to the redux store and will fetch the target modifier
 * definitions if they do not exist
 */
const TargetModifiersSubscriber: React.FC<ITargetModifiersSubscriberProps> = ({
  modifiers,
  fetchTargetModifiers,
}) => {
  const [debouncedUseEffect] = useDebouncedCallback(() => {
    if (!modifiers.pending && (!modifiers.modifiers || !modifiers.modifiers.length)) {
      fetchTargetModifiers();
    }
  }, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    debouncedUseEffect();
  });

  return <span style={{ display: 'none' }} />;
};

const mapStateToProps = (state: IStore) => ({ modifiers: state.targetModifiers });

export default connect(mapStateToProps, { fetchTargetModifiers })(TargetModifiersSubscriber);
