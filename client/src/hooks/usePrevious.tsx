import { useEffect, useRef } from 'react';

/**
 * A hook used to hold the state from the previous render
 * @param {object} state The state top keep track of
 */
const usePrevious = state => {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
};

export { usePrevious as default };
