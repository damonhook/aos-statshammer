import { fetchModifiers } from 'api';
import appConfig from 'appConfig';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifiersSelector } from 'store/selectors';
import { useDebouncedCallback } from 'use-debounce';

/**
 * A component that is subscribed to the redux store and will fetch the modifier definitions
 * if they do not exist
 */
const ModifiersSubscriber = () => {
  const dispatch = useDispatch();
  const modifiers = useSelector(modifiersSelector, _.isEqual);

  const [debouncedUseEffect] = useDebouncedCallback(
    () => {
      if (!modifiers?.pending && !modifiers?.items?.length) {
        dispatch(fetchModifiers());
      }
    },
    appConfig.timers.retry,
    { leading: true },
  );

  useEffect(() => {
    debouncedUseEffect();
  });

  return <span style={{ display: 'none' }} />;
};

export default ModifiersSubscriber;
