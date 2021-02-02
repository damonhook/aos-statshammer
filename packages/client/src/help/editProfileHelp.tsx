import { Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { buildHelpSteps, selectorsWithPrefix } from 'utils/help'

export const helpSelectors = selectorsWithPrefix('help-profile', {
  ids: {
    profileName: 'name',
    profileCharacteristic: 'characteristics',
    profileDialogActions: 'dialog-actions',
    addModifiers: 'add-modifiers',
  },
  classes: {
    modifiers: 'modifiers',
  },
})

interface GetStepsProps {
  numModifiers: number
}
const getHelpSteps = ({ numModifiers }: GetStepsProps) =>
  buildHelpSteps([
    {
      id: helpSelectors.ids.profileCharacteristic,
      content: (
        <>
          <Typography>
            You can modifiy the characteristics of the weapon.
            <Alert severity="info" style={{ marginTop: 8 }}>
              Certain fields (attacks and damage) also accept dice values (e.g: <code>{"'D6'"}</code>,{' '}
              <code>{"'D3 + 2'"}</code>, <code>{"'2D6'"}</code>, etc).
            </Alert>
          </Typography>
        </>
      ),
    },
    {
      id: helpSelectors.ids.addModifiers,
      content: 'Add modifiers (abilities) to the weapon profile.',
    },
    {
      className: helpSelectors.classes.modifiers,
      content: 'Edit your applied modifiers to best match what is on the warscroll.',
      hidden: numModifiers <= 0,
    },
    {
      id: helpSelectors.ids.profileName,
      content: 'You can optionally add a name to the weapon profile.',
    },
    {
      id: helpSelectors.ids.profileDialogActions,
      content: 'Save or discard the changes you have made to the weapon profile.',
    },
  ])

export default getHelpSteps
