import { ModelGroup } from "@/types/unit"
import { Box, Button, Group, SimpleGrid, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"

interface ModelsForm {
  initialValues?: Omit<ModelGroup, "id">
}

export default function ModelsForm(props: ModelsForm) {
  const { initialValues } = props
  const form = useForm<Omit<ModelGroup, "id">>({ initialValues })

  return (
    <Box>
      <TextInput label="Quantity" mb="md" {...form.getInputProps("quantity")} />
      <Text fw="bold" mb={4}>
        Weapon
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 5 }} mb="sm">
        <TextInput label="Attacks" {...form.getInputProps("weapon.attacks")} />
        <TextInput
          label="To Hit"
          rightSection={<IconPlus />}
          {...form.getInputProps("weapon.toHit")}
        />
        <TextInput
          label="To Wound"
          rightSection={<IconPlus />}
          {...form.getInputProps("weapon.toWound")}
        />
        <TextInput
          label="Rend"
          leftSection={<IconMinus />}
          {...form.getInputProps("weapon.rend")}
        />
        <TextInput label="Damage" {...form.getInputProps("weapon.damage")} />
      </SimpleGrid>
      <Text fw={500} mb={4}>
        Abilities
      </Text>
      <Box mb="md">
        <Text>Reroll Ones</Text>
        <Text c="dimmed">Reroll rolls of one to hit</Text>
      </Box>
      <Group justify="end">
        <Button component={Link} variant="default" to="/units" replace>
          Cancel
        </Button>
        <Button component={Link} to="/units" replace>
          Save
        </Button>
      </Group>
    </Box>
  )
}
