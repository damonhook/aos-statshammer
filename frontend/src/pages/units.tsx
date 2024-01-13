import PageContainer from "@/components/page-container"
import UnitForm from "@/components/unit-form"
import { useUnitsStore } from "@/stores/units"
import { Button, Group, Paper, Stack, Text } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { IconInfoCircle } from "@tabler/icons-react"

export default function Units() {
  const units = useUnitsStore((state) => state.units)
  const createUnit = useUnitsStore((state) => state.createUnit)

  const handleCreateUnit = () => {
    createUnit({ name: `Unit ${units.length + 1}`, models: [] })
  }

  return (
    <PageContainer
      title="Units"
      rightSection={
        <Button onClick={handleCreateUnit} leftSection={<IconPlus />}>
          Create Unit
        </Button>
      }
    >
      <Stack mb="1rem">
        {!units.length && (
          <Paper p="md">
            <Group gap={4}>
              <IconInfoCircle />
              <Text fw="bold">It's lonely here</Text>
            </Group>
            <Text>There are no units here, try adding some</Text>
          </Paper>
        )}
        {units.map((unit, index) => (
          <UnitForm
            key={unit.id}
            index={index}
            name={unit.name}
            models={unit.models}
          />
        ))}
      </Stack>
    </PageContainer>
  )
}
