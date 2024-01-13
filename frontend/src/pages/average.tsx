import { AverageDamageResponse } from "@/api"
import PageContainer from "@/components/page-container"
import { AreaChart, BarChart } from "@mantine/charts"
import { Paper, Stack, Text } from "@mantine/core"
import { useLoaderData } from "@tanstack/react-router"

const series = [
  { name: "Unit 1", color: "violet.6" },
  { name: "Unit 2", color: "teal.6" },
]

const graphHeight = { base: 250, md: 350 }

export default function Average() {
  const res: AverageDamageResponse = useLoaderData({ from: "/average" })
  const data = res.results.map(({ save, values }) => ({ save, ...values }))

  return (
    <PageContainer title="Average Damage">
      <Stack>
        <Paper p="lg">
          <Text mb="md" ta="center" fw="bold">
            Average Damage Per Save
          </Text>
          <BarChart
            h={graphHeight}
            data={data}
            dataKey="save"
            series={series}
            withLegend
            legendProps={{ verticalAlign: "bottom" }}
          />
        </Paper>
        <Paper p="lg">
          <Text mb="md" ta="center" fw="bold">
            Average Damage Per Save
          </Text>
          <AreaChart
            h={graphHeight}
            curveType="natural"
            data={data}
            dataKey="save"
            series={series}
            withLegend
            legendProps={{ verticalAlign: "bottom" }}
          />
        </Paper>
        <Paper p="lg">
          <Text mb="md" ta="center" fw="bold">
            Average Damage Per Save
          </Text>
          <BarChart
            h={graphHeight}
            type="percent"
            orientation="vertical"
            data={data}
            dataKey="save"
            series={series}
            withLegend
            legendProps={{ verticalAlign: "bottom" }}
          />
        </Paper>
      </Stack>
    </PageContainer>
  )
}
