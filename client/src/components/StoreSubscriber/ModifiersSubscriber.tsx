import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchModifiers } from 'api';
import { useDebouncedCallback } from 'use-debounce';
import { RETRY_TIMEOUT } from 'appConstants';
import { IStore } from 'types/store';

const mapStateToProps = (state: IStore) => ({ modifiers: state.modifiers });

const connector = connect(mapStateToProps, { fetchModifiers });
interface IModifiersSubscriberProps extends ConnectedProps<typeof connector> {}

/**
 * A component that is subscribed to the redux store and will fetch the modifier definitions
 * if they do not exist
 */
const ModifiersSubscriber: React.FC<IModifiersSubscriberProps> = ({ modifiers, fetchModifiers }) => {
  const [debouncedUseEffect] = useDebouncedCallback(
    () => {
      if (!modifiers?.pending && !modifiers?.modifiers?.length) {
        fetchModifiers();
      }
    },
    RETRY_TIMEOUT,
    { leading: true },
  );

  useEffect(() => {
    debouncedUseEffect();
  });

  return <span style={{ display: 'none' }} />;
};

export default connector(ModifiersSubscriber);
