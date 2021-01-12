import { Accordion, AccordionSummary } from '@material-ui/core'
import React from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'typescript'

interface ModifierItemProps {
  definition: ModifierDefinition
  modifier: Modifier
}

const ModifierItem = ({ definition, modifier }: ModifierItemProps) => {
  return (
    <Accordion>
      <AccordionSummary></AccordionSummary>
    </Accordion>
  )
}

export default ModifierItem
