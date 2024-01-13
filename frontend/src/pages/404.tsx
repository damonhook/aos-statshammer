import { Button, Container, Text, Title } from "@mantine/core"
import { IconHome } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"

export default function NotFound() {
  return (
    <Container ta="center" mt="xl">
      <Text fz={{ base: "7rem", sm: "14rem" }} fw={900} c="dimmed" lh="xs">
        404
      </Text>
      <Container size="xs">
        <Title mb="0.5rem">Nothing to see here</Title>
        <Text c="dimmed" mb="2rem">
          The page you are trying to open does not exist.
        </Text>
        <Button leftSection={<IconHome />} component={Link} to="/">
          Take me home
        </Button>
      </Container>
    </Container>
  )
}
