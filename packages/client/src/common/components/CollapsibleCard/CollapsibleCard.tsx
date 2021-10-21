import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, PaperProps, Typography } from '@mui/material'
import React from 'react'

interface CollapsibleCardProps {
  title: string
  startCollapsed?: boolean
  hover?: boolean
  controls?: React.ReactNode
  variant?: PaperProps['variant']
  id?: string
  children?: React.ReactNode
}

const CollapsibleCard = ({
  title,
  startCollapsed,
  hover,
  controls,
  variant,
  id,
  children,
}: CollapsibleCardProps) => {
  const [open, setOpen] = React.useState(!startCollapsed)

  const handleChange = (e: React.ChangeEvent<any>, isExpanded: boolean) => {
    setOpen(isExpanded)
  }

  return (
    <Accordion
      id={id}
      expanded={open}
      onChange={handleChange}
      sx={{
        ...(!!hover && {
          '&:hover': {
            boxShadow: 'theme.shadows[3]',
          },
          transition: theme =>
            theme.transitions.create(['box-shadow'], {
              duration: theme.transitions.duration.standard,
            }),
        }),
      }}
      disableGutters
      variant={variant}
    >
      <AccordionSummary
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        expandIcon={<ExpandMoreIcon />}
        sx={{ flexDirection: 'row-reverse', pl: 1 }}
      >
        <Typography>{title}</Typography>
        {controls && <span>{controls}</span>}
      </AccordionSummary>
      <AccordionDetails sx={{ flexDirection: 'column', p: { xs: 1, md: 2 } }}>{children}</AccordionDetails>
    </Accordion>
  )
}

export default CollapsibleCard
