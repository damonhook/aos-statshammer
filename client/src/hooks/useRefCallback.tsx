import { useEffect, useState } from 'react';

const useRefCallback = (callback: (node: HTMLElement | null) => void) => {
  const [node, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (node) {
      callback(node);
    }
  }, [callback, node]);

  return [setRef];
};

export default useRefCallback;
