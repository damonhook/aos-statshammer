import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import AbilityDefintion from './AbilityDefinition'

interface SelectAbilityProps {
  isOpen: boolean
  onClose: () => void
}
const SelectAbility = ({ isOpen, onClose }: SelectAbilityProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Select Weapon Ability</DrawerHeader>
        <DrawerBody>
          <AbilityDefintion />
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={4} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectAbility
