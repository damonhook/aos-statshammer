import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react'
import { useState } from 'react'
import AbilitySummary from './AbilitySummary'
import EditAbility from './EditAbility'
import SelectAbility from './SelectAbility'

const WeaponForm = () => {
  const [editAbilityOpen, setEditAbilityOpen] = useState(false)
  const [selectAbilityOpen, setSelectAbilityOpen] = useState(false)

  return (
    <Box borderWidth={1} borderRadius="md" p={4}>
      {/* <Box borderLeftWidth={1} pl={4} ml={2} borderBottomRadius="md"> */}
      <FormControl mb={4}>
        <FormLabel>Weapon Name</FormLabel>
        <Input />
      </FormControl>
      <SimpleGrid columns={{ sm: 3, md: 6 }} spacing={2} mb={8}>
        <FormControl>
          <FormLabel>Models</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>Attacks</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>To Hit</FormLabel>
          <InputGroup>
            <Input />
            <InputRightAddon children="+" />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>To Wound</FormLabel>
          <InputGroup>
            <Input />
            <InputRightAddon children="+" />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Rend</FormLabel>
          <InputGroup>
            <InputLeftAddon children="-" />
            <Input />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Damage</FormLabel>
          <Input />
        </FormControl>
      </SimpleGrid>
      <Flex justify="space-between" mb={4} alignItems="center">
        <Heading as="h3" fontSize="lg">
          Abilities
        </Heading>
        <Tooltip hasArrow label="Add new ability">
          <IconButton
            aria-label="Add new ability"
            colorScheme="teal"
            icon={<AddIcon />}
            size="sm"
            onClick={() => setSelectAbilityOpen(true)}
          />
        </Tooltip>
      </Flex>
      <AbilitySummary
        onClick={() => setEditAbilityOpen(true)}
        onDelete={() => {}}
      />
      <Flex mt={2} justify="end"></Flex>
      <EditAbility
        isOpen={editAbilityOpen}
        onClose={() => setEditAbilityOpen(false)}
      />
      <SelectAbility
        isOpen={selectAbilityOpen}
        onClose={() => setSelectAbilityOpen(false)}
      />
    </Box>
  )
}

export default WeaponForm
