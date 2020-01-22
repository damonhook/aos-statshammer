import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchTargetModifiers } from 'api';
import { useDebouncedCallback } from 'use-debounce';
import { RETRY_TIMEOUT } from 'appConstants';
import { IStore } from 'types/store';

const mapStateToProps = (state: IStore) => ({ modifiers: state.targetModifiers });

const connector = connect(mapStateToProps, { fetchTargetModifiers });
interface ITargetModifiersSubscriberProps extends ConnectedProps<typeof connector> {}

/**
 * A component that is subscribed to the redux store and will fetch the target modifier
 * definitions if they do not exist
 */
const TargetModifiersSubscriber: React.FC<ITargetModifiersSubscriberProps> = ({
  modifiers,
  fetchTargetModifiers,
}) => {
  const [debouncedUseEffect] = useDebouncedCallback(
    () => {
      if (!modifiers.pending && (!modifiers.modifiers || !modifiers.modifiers.length)) {
        fetchTargetModifiers();
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

export default connector(TargetModifiersSubscriber);
