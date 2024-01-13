import ModelsForm from "@/components/models-form/models-form"
import PageContainer from "@/components/page-container"
import { useUnitsStore } from "@/stores/units"
import { Text } from "@mantine/core"
import { useParams } from "@tanstack/react-router"

export default function ModelGroup() {
  const { unitId, modelGroupId } = useParams({
    from: "/units/$unitId/$modelGroupId",
    select: ({ unitId, modelGroupId }) => ({
      unitId: Number(unitId),
      modelGroupId: Number(modelGroupId),
    }),
  })
  const unit = useUnitsStore((state) => state.units[unitId])
  const modelGroup = unit.models[modelGroupId]
  console.log(modelGroup)

  return (
    <PageContainer title="Edit Model Group">
      <Text c="dimmed" pb="1rem">
        Unit: {unit.name}
      </Text>
      <ModelsForm initialValues={modelGroup} />
    </PageContainer>
  )
}
