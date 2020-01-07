import { useState, useEffect, useCallback } from 'react';
/**
 * A hook used to add long press functionality to a component
 * @param {func} callback The function to call on long press
 * @param {int} ms The amount of time in ms to wait before calling the functino
 */
const useLongPress = (callback: () => void, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress, callback, ms]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
};

export { useLongPress as default };
