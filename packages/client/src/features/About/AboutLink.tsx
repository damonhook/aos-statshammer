import { Link } from '@material-ui/core'
import React from 'react'
import { ExternalLink } from 'utils/routes'

interface AboutLinkProps {
  href: ExternalLink
  children: React.ReactNode
}

const AboutLink = ({ href, children }: AboutLinkProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener">
      {children}
    </Link>
  )
}

export default AboutLink
