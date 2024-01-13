import { Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import {
  Anchor,
  AppShell,
  Burger,
  Container,
  Flex,
  Group,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import { Link } from "@tanstack/react-router"
import Nav from "@/components/nav"
import ColorSchemeButton from "@/components/color-scheme-button"
import { useDisclosure } from "@mantine/hooks"
import BackToTop from "@/components/back-to-top"

const links = [
  { name: "Home", path: "/" },
  { name: "Units", path: "/units" },
  { name: "Target", path: "/target" },
  { name: "Average", path: "/average" },
  { name: "Simulate", path: "/simulate" },
]

export default function Root() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      // footer={{ height: 150 }}
      withBorder={false}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" flex={1}>
            <Anchor component={Link} to="/">
              AoS Statshammer
            </Anchor>
            <Group>
              <Group gap={0} visibleFrom="sm">
                <Nav items={links} />
              </Group>
              <ColorSchemeButton variant="default" size="xl" />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Nav items={links} />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          "background-color":
            "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-9))",
          minHeight: "calc(100dvh - 150px)",
        }}
      >
        <Outlet />
      </AppShell.Main>

      <BackToTop />
      {/* <AppShell.Footer> */}
      <Container size="lg" p="lg" component="footer" h={150}>
        <Flex justify="space-between">
          <Container size="md" p={0} m={0}>
            <Text>
              Built by Damon Hook (
              <Anchor href="https://www.damonhook.com" target="_blank">
                damonhook.com
              </Anchor>
              )
            </Text>
            <Text c="dimmed" fz="xs">
              Disclaimer: This tool is in no way endorsed or sanctioned by Games
              Workshop - it is unofficial and fan-made. I take absolutely no
              credit for any of the Games Workshop content displayed above.
            </Text>
          </Container>
          <Space w="xl" />
          <Stack gap={0} visibleFrom="sm">
            {links.map(({ name, path }) => (
              <Anchor component={Link} to={path} size="sm" key={name}>
                {name}
              </Anchor>
            ))}
          </Stack>
        </Flex>
        {/* <TanStackRouterDevtools /> */}
      </Container>
      {/* </AppShell.Footer> */}
    </AppShell>
  )
}
