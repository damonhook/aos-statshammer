import { Flex } from '@chakra-ui/react'
import Features from './Features'
import Hero from './Hero'
import OtherLinks from './OtherLinks'

const Home = () => {
  return (
    <Flex direction="column" w="full" alignItems="center" px={6}>
      <Hero />
      <Features />
      <OtherLinks />
    </Flex>
  )
}

export default Home
