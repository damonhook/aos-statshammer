import type { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material'
import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: {
    name: string
    href: string
  }[]
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {items.map(({ name, href }, index) => (
        <Link
          key={href}
          underline="hover"
          color="inherit"
          component={RouterLink}
          to={href}
          {...(index === items.length - 1 && { color: 'text.primary' })}
        >
          {name}
        </Link>
      ))}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
