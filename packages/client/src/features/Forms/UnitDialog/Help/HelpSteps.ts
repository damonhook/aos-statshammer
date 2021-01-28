import { ReactourStep } from 'reactour'

export const helpIds = {
  unitName: 'unit-name',
  addWeaponProfile: 'add-weapon-profile',
  importExport: 'import-export',
  unitDialogActions: 'unit-dialog-actions',
}

export const helpClasses = {
  toggleActiveProfile: 'toggle-active-profile',
  weaponProfile: 'weapon-profile',
  weaponProfileControls: 'weapon-profile-controls',
}

const steps: ReactourStep[] = [
  {
    selector: `#${helpIds.unitName}`,
    content: 'Edit the name of your unit.',
  },
  {
    selector: `#${helpIds.addWeaponProfile}`,
    content: 'Add new weapon profiles to your unit.',
  },
  {
    selector: `.${helpClasses.toggleActiveProfile}`,
    content: 'Click to toggle whether the profile is active or not.',
  },
  {
    selector: `.${helpClasses.weaponProfile}`,
    content: 'Click to edit the weapon profile.',
  },
  {
    selector: `.${helpClasses.weaponProfileControls}`,
    content: 'Open the menu to perform actions on the weapon profile (e.g: Copy, Delete)',
  },
  {
    selector: `#${helpIds.importExport}`,
    content: 'You can export (save) this unit to your device, as well as, import previously saved units.',
  },
  {
    selector: `#${helpIds.unitDialogActions}`,
    content: 'Save or discard the changes you have made to the unit.',
  },
]

export default steps
