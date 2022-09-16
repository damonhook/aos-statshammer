import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { Link as RouteLink } from 'react-router-dom'
import { LogoIcon } from './Icons'

const Hero = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      maxW="lg"
      textAlign="center"
      py={24}
    >
      <LogoIcon color="teal" fontSize="9xl" mb={4} />
      <Heading as="h1" size="3xl" mb={8}>
        AoS Statshammer
      </Heading>
      <Text
        color={'gray.600'}
        _dark={{ color: 'gray.400' }}
        fontSize="xl"
        mb={8}
      >
        A tool for calculating and comparing potential damage outputs for{' '}
        <strong>Warhammer Age of Sigmar</strong> units.
      </Text>
      <ButtonGroup size="lg" spacing={8}>
        <RouteLink to="/units">
          <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />}>
            Get Started
          </Button>
        </RouteLink>
        <Link href="https://github.com/damonhook/aos-statshammer" isExternal>
          <Button leftIcon={<Icon as={FaGithub} />}>Github</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  )
}

export default Hero
