import { Flex, Container, Title, Text, Button, SimpleGrid } from "@mantine/core"
import FeatureCard from "@/components/feature-card"
import {
  IconUsersGroup,
  IconBoxMultiple,
  IconChartBar,
  IconChartLine,
  IconDice6,
  IconExternalLink,
} from "@tabler/icons-react"
import Hero from "@/components/hero"

export default function Home() {
  return (
    <Flex direction="column" p="xl">
      <Hero />
      <Container size="xl" mb="3rem">
        <Title order={2} ta="center" mb="1rem">
          Features
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          <FeatureCard title="Create Units" icon={<IconUsersGroup />}>
            Lorem Ipsum
          </FeatureCard>
          <FeatureCard title="Abilities" icon={<IconBoxMultiple />}>
            Lorem Ipsum
          </FeatureCard>
          <FeatureCard title="Average Damage" icon={<IconChartBar />}>
            Calculate the average damage that each created unit is expected to
            do against various saves.
          </FeatureCard>
          <FeatureCard title="Simulate Attacks" icon={<IconDice6 />}>
            Simulate an action for each create unit, performed against various
            saves.
          </FeatureCard>
          <FeatureCard title="Probability Graphs" icon={<IconChartLine />}>
            Generate discrete and cumulative probability graphs based on
            simulated attacks.
          </FeatureCard>
        </SimpleGrid>
      </Container>
      <Container size="xl" ta="center" mb="3rem">
        <Title order={2} mb="1rem">
          Sister Project
        </Title>
        <Text opacity={0.7} mb="1rem">
          Similar to this tool, except it is for <b>Warhammer Warcry</b>{" "}
          fighters.
        </Text>
        <Button
          component="a"
          href="https://warcry-statshammer.herokuapp.com"
          target="__blank"
          color="red"
          variant="light"
          rightSection={<IconExternalLink />}
        >
          Warcry Statshammer
        </Button>
      </Container>
    </Flex>
  )
}
