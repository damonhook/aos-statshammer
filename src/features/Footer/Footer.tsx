import { HStack, Icon, Link, Text, VStack } from '@chakra-ui/react'
import { FaGithub, FaReddit, FaTag } from 'react-icons/fa'

const Footer = () => {
  return (
    <VStack mt={12} mb={8} spacing={2} textAlign="center" as="footer" px={2}>
      <Text>
        Made by{' '}
        <Link href="https://github.com/damonhook" isExternal>
          Damon Hook (NomadHook)
        </Link>
      </Text>
      <HStack spacing={4} justify="center">
        <Link href="https://github.com/damonhook/aos-statshammer" isExternal>
          <Icon as={FaGithub} />
        </Link>
        <Link
          href="https://github.com/damonhook/aos-statshammer/releases"
          isExternal
        >
          <Icon as={FaTag} />
        </Link>
        <Link href="https://www.reddit.com/r/AoSStatshammer" isExternal>
          <Icon as={FaReddit} />
        </Link>
      </HStack>
      <Text color="gray.600" _dark={{ color: 'gray.400' }} fontSize="sm">
        This tool is in no way endorsed or sanctioned by Games Workshop - it is
        unnoffical and fan-made.
      </Text>
    </VStack>
  )
}

export default Footer
