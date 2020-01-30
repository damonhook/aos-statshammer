import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const useIsMobile = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile;
};

export default useIsMobile;
