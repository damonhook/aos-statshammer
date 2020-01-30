import React from 'react';
import { useIsMobile } from 'hooks';
import { Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import SocialIcon from './SocialIcon';

interface ISocialItemProps {
  className?: string;
  icon: React.ReactNode;
  href: string;
  text: string;
  forceVariant?: 'mini' | 'normal';
}
const SocialItem = ({ className, icon, href, text, forceVariant }: ISocialItemProps) => {
  const theme = useTheme();
  const mobile = useIsMobile();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const useMini = forceVariant === 'mini' || (forceVariant !== 'normal' && xs);

  return !useMini ? (
    <Button
      size={mobile ? 'medium' : 'small'}
      className={className}
      startIcon={icon}
      variant="contained"
      href={href}
      target="_blank"
    >
      {text}
    </Button>
  ) : (
    <SocialIcon className={className} icon={icon} href={href} text={text} />
  );
};

export default SocialItem;
