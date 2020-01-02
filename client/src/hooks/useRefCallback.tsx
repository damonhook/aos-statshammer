import { useEffect, useState } from 'react';

const useRefCallback = callback => {
  const [node, setRef] = useState(null);

  useEffect(() => {
    if (node) {
      callback(node);
    }
  }, [callback, node]);

  return [setRef];
};

export default useRefCallback;
