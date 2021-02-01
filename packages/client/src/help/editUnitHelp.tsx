import { buildHelpSteps, selectorsWithPrefix } from 'utils/help'

export const helpSelectors = selectorsWithPrefix('help-unit', {
  ids: {
    unitName: 'name',
    addWeaponProfile: 'add-weapon-profile',
    importExport: 'import-export',
    unitDialogActions: 'dialog-actions',
  },
  classes: {
    toggleActiveProfile: 'toggle-active-profile',
    weaponProfile: 'weapon-profile',
    weaponProfileControls: 'weapon-profile-controls',
  },
})

interface GetStepsProps {
  numWeaponProfiles: number
}
const getHelpSteps = ({ numWeaponProfiles }: GetStepsProps) =>
  buildHelpSteps([
    {
      id: helpSelectors.ids.unitName,
      content: 'Edit the name of your unit.',
    },
    {
      id: helpSelectors.ids.addWeaponProfile,
      content: 'Add new weapon profiles to your unit.',
    },
    {
      className: helpSelectors.classes.toggleActiveProfile,
      content: 'Click to toggle whether the profile is active or not.',
      hidden: numWeaponProfiles <= 0,
    },
    {
      className: helpSelectors.classes.weaponProfile,
      content: 'Click to edit the weapon profile.',
      hidden: numWeaponProfiles <= 0,
    },
    {
      className: helpSelectors.classes.weaponProfileControls,
      content: 'Open the menu to perform actions on the weapon profile (e.g: Copy, Delete)',
      hidden: numWeaponProfiles <= 0,
    },
    {
      id: helpSelectors.ids.importExport,
      content: 'You can export (save) this unit to your device, as well as, import previously saved units.',
    },
    {
      id: helpSelectors.ids.unitDialogActions,
      content: 'Save or discard the changes you have made to the unit.',
    },
  ])

export default getHelpSteps
