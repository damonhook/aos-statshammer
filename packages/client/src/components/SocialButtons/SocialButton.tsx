import { Button, IconButton, Tooltip } from '@material-ui/core'
import { GitHub, LocalOffer, Reddit } from '@material-ui/icons'
import { WarcryStatshammerIcon } from 'components/Icons'
import { useIsMobile } from 'hooks'
import React from 'react'
import { EXTERNAL_LINKS, ExternalLink } from 'utils/routes'

interface SocialItemProps {
  icon: React.ReactNode
  href: ExternalLink
  text?: string
  forceMini?: boolean
  className?: string
}

const SocialItem = ({ icon, href, text, forceMini, className }: SocialItemProps) => {
  const isMobile = useIsMobile()

  return forceMini || !text || isMobile ? (
    <Tooltip title={text ?? ''}>
      <IconButton size="small" href={href} className={className}>
        {icon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button startIcon={icon} href={href} className={className}>
      {text}
    </Button>
  )
}

interface SocialButtonProps {
  className?: string
}

export const GithubButton = ({ className }: SocialButtonProps) => (
  <SocialItem text="Github" icon={<GitHub />} href={EXTERNAL_LINKS.GITHUB} className={className} />
)

export const RedditButton = ({ className }: SocialButtonProps) => (
  <SocialItem text="Reddit" icon={<Reddit />} href={EXTERNAL_LINKS.REDDIT} className={className} />
)

export const ReleasesButton = ({ className }: SocialButtonProps) => (
  <SocialItem text="Releases" icon={<LocalOffer />} href={EXTERNAL_LINKS.RELEASES} className={className} />
)

export const WarcryStatshammerButton = ({ className }: SocialButtonProps) => (
  <SocialItem
    text="Warcry"
    icon={<WarcryStatshammerIcon />}
    href={EXTERNAL_LINKS.WARCRY_STATSHAMMER}
    className={className}
  />
)

export default SocialItem
