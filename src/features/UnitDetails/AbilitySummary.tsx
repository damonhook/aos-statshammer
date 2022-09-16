import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/react'

interface AbilityValueProps {
  name: string
  value?: string | number | boolean
}
const AbilityValue = ({ name, value }: AbilityValueProps) => {
  return (
    <Text as="span" color={value ? 'teal' : 'tomato'}>
      {value ?? `[${name}]`}
    </Text>
  )
}

interface AbilitySummaryProps {
  variant?: 'outlined' | 'ghost'
  onClick?: () => void
  onDelete?: () => void
}
const AbilitySummary = ({
  variant = 'outlined',
  onClick,
  onDelete,
}: AbilitySummaryProps) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <Box
      w="full"
      onClick={onClick}
      as={onClick && 'button'}
      textAlign="left"
      p={2}
      _hover={{
        ...(onClick && {
          bg: 'blackAlpha.50',
          _dark: { bg: 'whiteAlpha.50' },
        }),
      }}
      {...(variant === 'outlined' && {
        borderWidth: '1px',
        borderRadius: 'md',
      })}
      {...(variant === 'ghost' && { px: 0 })}
    >
      <HStack justify="space-between">
        <Box>
          <Heading
            as={variant === 'outlined' ? 'h4' : 'h2'}
            fontSize={variant === 'outlined' ? 'md' : 'lg'}
          >
            Mortal Wounds
          </Heading>
          <Box>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Deal <AbilityValue name="mortals" value="D6" /> Mortal Wounds on a{' '}
              <AbilityValue name="characteristic" value="hit" /> roll of{' '}
              <AbilityValue name="roll" value="3+" />
            </Text>
          </Box>
        </Box>
        {onDelete && (
          <IconButton
            variant="ghost"
            aria-label="Delete ability"
            icon={<DeleteIcon />}
            onClick={handleDelete}
            size="sm"
          />
        )}
      </HStack>
    </Box>
  )
}

export default AbilitySummary
