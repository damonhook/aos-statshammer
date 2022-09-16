import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react'

const OtherLinks = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      maxW="lg"
      textAlign="center"
      py={24}
    >
      <Heading as="h2" size="lg" mb={2}>
        Related Projects
      </Heading>
      <Text color="gray.600" _dark={{ color: 'gray.400' }} mb={4}>
        If you are interested in a similar project but for the Warhammer Warcry
        game, we have a similar tool called <strong>Warcry Statshammer</strong>.
      </Text>
      <Link href="https://warcry-statshammer.herokuapp.com/" isExternal>
        <Button rightIcon={<ArrowForwardIcon />} colorScheme="red">
          Warcry Statshammer
        </Button>
      </Link>
    </Flex>
  )
}

export default OtherLinks
