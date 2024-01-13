import { Weapon } from "@/types/unit"
import { Table, Text } from "@mantine/core"

interface ModelsCardProps {
  quantity: number
  weapon: Weapon
}

export default function ModelsCard(props: ModelsCardProps) {
  const { quantity, weapon } = props

  return (
    <div>
      <Text mb="xs">{quantity} models</Text>
      <Text fw={500}>Weapon</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Attacks</Table.Th>
            <Table.Th>To Hit</Table.Th>
            <Table.Th>To Wound</Table.Th>
            <Table.Th>Rend</Table.Th>
            <Table.Th>Damage</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>{weapon.attacks}</Table.Td>
            <Table.Td>{weapon.toHit}</Table.Td>
            <Table.Td>{weapon.toWound}</Table.Td>
            <Table.Td>{weapon.rend}</Table.Td>
            <Table.Td>{weapon.damage}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <div>
        <Text>Reroll Ones</Text>
        <Text c="dimmed">Reroll rolls of one to hit</Text>
      </div>
    </div>
  )
}
