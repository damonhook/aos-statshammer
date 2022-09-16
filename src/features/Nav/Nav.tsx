import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Link, Spacer, useColorMode } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      width="full"
      alignItems="center"
      position="sticky"
      top={0}
      right={0}
      py={2}
      px={4}
      zIndex="sticky"
      justifyContent="space-between"
      bg="chakra-body-bg"
    >
      <Link as={RouteLink} to="/">
        AoS Statshammer
      </Link>
      <Spacer />
      <IconButton
        aria-label={`Switch to {colorMode === 'light' ? 'dark' : 'light'} mode`}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

export default Nav
