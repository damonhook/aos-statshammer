import { AddIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Unit {
  name: string
  weapons: Weapon[]
}

interface Weapon {
  name?: string
  models: number
  attacks: number
  toHit: number
  toWound: number
  rend: number
  damage: number
}

const NoUnitsMessage = () => {
  return (
    <Alert
      colorScheme="gray"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="150px"
      borderRadius="md"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        It's lonely here
      </AlertTitle>
      <AlertDescription>
        No units have been added. Why not add some.
      </AlertDescription>
    </Alert>
  )
}

interface UnitSummaryProps {
  unit: Unit
}
const UnitSummary = ({ unit }: UnitSummaryProps) => {
  return (
    <Box borderWidth={1} borderRadius="md" py={4} w="full">
      <Box px={4}>
        <Heading as="h2" fontSize="xl" mb={4}>
          {unit.name}
        </Heading>
        <Heading as="h3" fontSize="md" mb={4}>
          Weapons
        </Heading>
      </Box>
      <VStack spacing={2}>
        {unit.weapons.map(weapon => (
          <TableContainer w="full">
            <Table variant="simple" size="sm">
              {!!weapon.name && (
                <TableCaption placement="top" fontSize="md">
                  {weapon.name}
                </TableCaption>
              )}
              <Thead>
                <Tr>
                  <Th textAlign="center">Models</Th>
                  <Th textAlign="center">Attacks</Th>
                  <Th textAlign="center">To Hit</Th>
                  <Th textAlign="center">To Wound</Th>
                  <Th textAlign="center">Rend</Th>
                  <Th textAlign="center">Damage</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td textAlign="center">{weapon.models}</Td>
                  <Td textAlign="center">{weapon.attacks}</Td>
                  <Td textAlign="center">{`${weapon.toHit}+`}</Td>
                  <Td textAlign="center">{`${weapon.toWound}+`}</Td>
                  <Td textAlign="center">
                    {weapon.rend ? `-${weapon.rend}` : '-'}
                  </Td>
                  <Td textAlign="center">{weapon.damage}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        ))}
      </VStack>
    </Box>
  )
}

const Units = () => {
  const [units, setUnits] = useState<Unit[]>([])
  const navigate = useNavigate()

  const handleAddUnit = () => {
    navigate('new')
  }

  // const handleAddUnit = () => {
  //   setUnits([
  //     ...units,
  //     {
  //       name: `Unit ${units.length}`,
  //       weapons: [
  //         {
  //           name: 'Weapon',
  //           models: 10,
  //           attacks: 2,
  //           toHit: 3,
  //           toWound: 4,
  //           rend: 1,
  //           damage: 2,
  //         },
  //       ],
  //     },
  //   ])
  // }

  return (
    <Container maxW="container.lg">
      <Heading as="h1" mb={4}>
        Units
      </Heading>
      <Box mb={4}>
        {units.length ? (
          <VStack spacing={2} w="full">
            {units.map(unit => (
              <UnitSummary key={unit.name} unit={unit} />
            ))}
          </VStack>
        ) : (
          <NoUnitsMessage />
        )}
      </Box>
      <Flex justify="end">
        <Button
          leftIcon={<AddIcon />}
          onClick={handleAddUnit}
          colorScheme="teal"
        >
          Create Unit
        </Button>
      </Flex>
    </Container>
  )
}

export default Units
