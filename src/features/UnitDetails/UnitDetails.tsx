import { AddIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Tooltip,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WeaponForm from './WeaponForm'

const EditWeapon = () => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {isExpanded ? 'Edit Weapon' : 'Weapon'}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={8} px={{ sm: 0, md: 4 }}>
            <WeaponForm />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}

const UnitDetails = () => {
  const [weapons, setWeapons] = useState<number[]>([0])
  const navigate = useNavigate()

  const handleAddWeapon = () => {
    setWeapons([...weapons, weapons.length])
  }

  const handleCancel = () => {
    navigate('/units', { replace: true })
  }

  return (
    <Container maxW="container.lg">
      <Heading as="h1" mb={4}>
        Create New Unit
      </Heading>
      <FormControl mb={4}>
        <FormLabel>Unit Name</FormLabel>
        <Input />
      </FormControl>
      <Flex justify="space-between" mb={4} alignItems="center">
        <Heading as="h2" fontSize="xl">
          Weapons
        </Heading>
        <Tooltip hasArrow label="Add new weapon">
          <IconButton
            aria-label="Add new weapon"
            icon={<AddIcon />}
            onClick={handleAddWeapon}
            size="sm"
            colorScheme="teal"
          />
        </Tooltip>
      </Flex>
      <Accordion allowMultiple defaultIndex={[0, 1]} mb={4}>
        {weapons.map(weapon => (
          <EditWeapon key={weapon} />
        ))}
      </Accordion>
      <HStack justify="end">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleCancel}>
          Submit
        </Button>
      </HStack>
    </Container>
  )
}

export default UnitDetails
