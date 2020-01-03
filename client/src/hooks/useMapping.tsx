import { useState, useEffect } from 'react';
const useMapping = (data, mapper, pending = false) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!pending && data && data.length) {
      const mappedData = mapper(data);
      setResults(mappedData);
    }
  }, [data, mapper, pending]);

  return results;
};

export default useMapping;
