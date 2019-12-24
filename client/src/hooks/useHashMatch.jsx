import { useLocation } from 'react-router-dom';

const useHashMatch = (hash) => {
  const location = useLocation();
  return location.hash === hash;
};

export default useHashMatch;
