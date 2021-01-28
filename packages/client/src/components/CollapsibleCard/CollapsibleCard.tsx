import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  PaperProps,
  Theme,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React, { useState } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  hover: {
    '&:hover': { boxShadow: theme.shadows[3] },
    transition: theme.transitions.create(['box-shadow'], {
      duration: theme.transitions.duration.standard,
    }),
  },
  heading: {
    flex: 1,
  },
  expandIcon: {
    color: theme.palette.action.active,
    marginRight: theme.spacing(1),
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shortest,
      delay: 300,
    }),
    '&$expanded': {
      transform: 'rotate(180deg)',
    },
  },
  expanded: {}, // Psuedo class
  controls: {},
  accorionSummaryContent: {
    margin: '10px 0px !important',
    alignItems: 'center',
  },
  accorionSummaryExpanded: {
    minHeight: '48px !important',
  },
}))

interface CollapsibleCardProps {
  title: string
  startCollapsed?: boolean
  hover?: boolean
  controls?: React.ReactNode
  children?: React.ReactNode
  variant?: PaperProps['variant']
}

const CollapsibleCard = ({
  title,
  children,
  startCollapsed,
  hover,
  controls,
  variant,
}: CollapsibleCardProps) => {
  const [open, setOpen] = useState(!startCollapsed)
  const classes = useStyles()

  const handleChange = (e: React.ChangeEvent<any>, isExpanded: boolean) => {
    setOpen(isExpanded)
  }

  return (
    <Accordion
      expanded={open}
      onChange={handleChange}
      className={clsx({ [classes.hover]: !!hover })}
      variant={variant}
    >
      <AccordionSummary
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        classes={{ root: classes.accorionSummaryExpanded, content: classes.accorionSummaryContent }}
      >
        <ExpandMoreIcon className={clsx(classes.expandIcon, { [classes.expanded]: open })} />
        <Typography className={classes.heading}>{title}</Typography>
        <span className={classes.controls}>{controls}</span>
      </AccordionSummary>
      <AccordionDetails style={{ flexDirection: 'column' }}>{children}</AccordionDetails>
    </Accordion>
  )
}

export default CollapsibleCard
