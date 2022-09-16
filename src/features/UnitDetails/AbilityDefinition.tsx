import { Box, Heading, Text } from '@chakra-ui/react'

interface AbilityValueProps {
  name: string
}
const AbilityValue = ({ name }: AbilityValueProps) => {
  return (
    <Text as="span" color="teal">
      {`[${name}]`}
    </Text>
  )
}

interface AbilityDefintionProps {}
const AbilityDefintion = (props: AbilityDefintionProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={2}
      as="button"
      _hover={{
        bg: 'blackAlpha.50',
        _dark: { bg: 'whiteAlpha.50' },
      }}
      textAlign="left"
      w="full"
    >
      <Heading as="h4" fontSize="md" mb={2}>
        Mortal Wounds
      </Heading>
      <Text color="gray.600" _dark={{ color: 'gray.400' }}>
        Deal <AbilityValue name="mortals" /> Mortal Wounds on a{' '}
        <AbilityValue name="characteristic" /> roll of{' '}
        <AbilityValue name="roll" />
      </Text>
    </Box>
  )
}

export default AbilityDefintion
