import { useState, useEffect } from 'react';

const useMapping = <T,>(data: T[], mapper: any, pending = false): T[] => {
  const [results, setResults] = useState<T[]>([]);

  useEffect(() => {
    if (!pending && data && data.length) {
      const mappedData = mapper(data);
      setResults(mappedData);
    }
  }, [data, mapper, pending]);

  return results;
};

export default useMapping;
