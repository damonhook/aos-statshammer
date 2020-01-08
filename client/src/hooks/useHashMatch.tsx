import { useLocation } from 'react-router-dom';

const useHashMatch = (hash: string): boolean => {
  const location = useLocation();
  return location.hash === hash;
};

export default useHashMatch;
