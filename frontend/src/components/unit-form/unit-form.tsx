import { useUnitsStore } from "@/stores/units"
import {
  Stack,
  Text,
  Paper,
  TextInput,
  ActionIcon,
  Group,
  Button,
  Accordion,
  Box,
} from "@mantine/core"
import React from "react"
import { IconTrash } from "@tabler/icons-react"
import { ModelGroup } from "@/types/unit"
import ModelGroupItem from "./model-group-item"

interface UnitFormProps {
  index: number
  name: string
  models?: ModelGroup[]
}

const UnitForm = React.memo(function UnitForm(props: UnitFormProps) {
  const { index, name, models } = props
  const editUnitName = useUnitsStore((state) => state.editUnitName)
  const removeUnit = useUnitsStore((state) => state.removeUnit)
  const addModelGroup = useUnitsStore((state) => state.addModelGroup)

  const handleAddModelGroup = () => {
    addModelGroup(index, {
      quantity: 0,
      weapon: { attacks: 2, toHit: 3, toWound: 3, rend: 0, damage: 1 },
    })
  }

  return (
    <Paper px="lg" py="md">
      <Group justify="space-between" mb="xs">
        <Text fw="bold" fz="lg">
          Unit
        </Text>
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => removeUnit(index)}
        >
          <IconTrash />
        </ActionIcon>
      </Group>
      <Stack gap="sm">
        <TextInput
          label="Name"
          placeholder="Name"
          value={name}
          onChange={(event) => editUnitName(index, event.currentTarget.value)}
        />
        <Box>
          <Accordion
            chevronPosition="left"
            variant="separated"
            multiple
            defaultValue={models?.map(({ id }) => id)} // Start with all expanded by default
          >
            {(models ?? []).map((model, modelIndex) => (
              <ModelGroupItem
                id={model.id}
                unitIndex={index}
                index={modelIndex}
                quantity={model.quantity}
                weapon={model.weapon}
              />
            ))}
          </Accordion>
        </Box>
        <Button variant="light" onClick={handleAddModelGroup}>
          Add Models
        </Button>
      </Stack>
    </Paper>
  )
})

export default UnitForm
