import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Switch,
  VStack,
} from '@chakra-ui/react'
import AbilitySummary from './AbilitySummary'

interface EditAbilityProps {
  isOpen: boolean
  onClose: () => void
}
const EditAbility = ({ isOpen, onClose }: EditAbilityProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Weapon Ability</DrawerHeader>
        <DrawerBody>
          <AbilitySummary variant="ghost" />
          <Heading as="h2" size="md" mt={8} mb={4}>
            Configuration
          </Heading>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Mortals</FormLabel>
              <Input />
              <FormHelperText>
                The number of mortal wounds this ability inflicts
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Characteristic</FormLabel>
              <Select placeholder="Select option">
                <option value="hit">Hit Roll</option>
                <option value="wound">Wound Roll</option>
              </Select>
              <FormHelperText>
                The roll characteristic that triggers this ability
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Roll</FormLabel>
              <InputGroup>
                <Input />
                <InputRightAddon children="+" />
              </InputGroup>
              <FormHelperText>
                The value you have to roll at or above for the ability to
                trigger
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Flex alignItems="center">
                <FormLabel my="auto">Unmodified</FormLabel>
                <Switch />
              </Flex>
              <FormHelperText>
                The value you have to roll at or above for the ability to
                trigger
              </FormHelperText>
            </FormControl>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={4} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default EditAbility
