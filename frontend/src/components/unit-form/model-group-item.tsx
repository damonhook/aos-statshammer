import { ActionIcon, Accordion, Center } from "@mantine/core"
import { IconDots } from "@tabler/icons-react"
import { Weapon } from "@/types/unit"
import ModelsCard from "../models-card/models-card"
import { useNavigate } from "@tanstack/react-router"
import classes from "./model-group-item.module.css"

interface ModelGroupItemProps {
  unitIndex: number
  index: number
  id: string
  quantity: number
  weapon: Weapon
}

export default function ModelGroupItem(props: ModelGroupItemProps) {
  const { unitIndex, index, id, quantity, weapon } = props
  const navigate = useNavigate()

  const handleModelGroupClicked = () => {
    navigate({
      to: "/units/$unitId/$modelGroupId",
      params: {
        unitId: unitIndex.toString(),
        modelGroupId: index.toString(),
      },
    })
  }

  return (
    <Accordion.Item value={id} key={id}>
      <Center>
        <Accordion.Control>Item 1</Accordion.Control>
        <ActionIcon size="lg" variant="subtle" color="gray">
          <IconDots size="1rem" />
        </ActionIcon>
      </Center>
      <Accordion.Panel
        className={classes.content}
        onClick={handleModelGroupClicked}
      >
        <ModelsCard key={id} quantity={quantity} weapon={weapon} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
