import { Container, Title, Text, Group, Button } from "@mantine/core"
import { Link } from "@tanstack/react-router"
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react"

export default function Hero() {
  return (
    <Container
      size="sm"
      ta="center"
      pt="6rem"
      pb={{ base: "3rem", md: "6rem" }}
    >
      <Title mb="1rem">AoS Statshammer</Title>
      <Text c="dimmed" fz="xl" mb="2rem">
        A tool for calculating and comparing potential damage outputs for{" "}
        <strong>Warhammer Age of Sigmar</strong> units.
      </Text>
      <Group justify="center" grow>
        <Button
          component={Link}
          variant="light"
          to="/units"
          size="lg"
          rightSection={<IconArrowRight />}
        >
          Get Started
        </Button>
        <Button
          component="a"
          variant="light"
          color="gray"
          href="https://github.com/damonhook/aos-statshammer"
          target="__blank"
          size="lg"
          leftSection={<IconBrandGithub />}
        >
          Github
        </Button>
      </Group>
    </Container>
  )
}
