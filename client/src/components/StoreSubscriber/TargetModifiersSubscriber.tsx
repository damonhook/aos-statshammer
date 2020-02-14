import { fetchTargetModifiers } from 'api';
import { RETRY_TIMEOUT } from 'appConstants';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifiersSelector } from 'store/selectors/modifiersSelectors';
import { useDebouncedCallback } from 'use-debounce';

/**
 * A component that is subscribed to the redux store and will fetch the target modifier
 * definitions if they do not exist
 */
const TargetModifiersSubscriber = () => {
  const dispatch = useDispatch();
  const modifiers = useSelector(modifiersSelector, _.isEqual);

  const [debouncedUseEffect] = useDebouncedCallback(
    () => {
      if (!modifiers.pending && (!modifiers.items || !modifiers.items.length)) {
        dispatch(fetchTargetModifiers());
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

export default TargetModifiersSubscriber;
