import { useViewportSize, useWindowScroll } from "@mantine/hooks"
import { ActionIcon, Affix, Button, Transition } from "@mantine/core"
import { IconArrowUp } from "@tabler/icons-react"

export default function BackToTop() {
  const [scroll, scrollTo] = useWindowScroll()
  const { height } = useViewportSize()

  return (
    <Affix position={{ bottom: 166, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > height / 2}>
        {(transitionStyles) => (
          <>
            <Button
              leftSection={<IconArrowUp />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              visibleFrom="md"
            >
              Scroll to top
            </Button>
            <ActionIcon
              hiddenFrom="md"
              size="xl"
              radius="xl"
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <IconArrowUp />
            </ActionIcon>
          </>
        )}
      </Transition>
    </Affix>
  )
}
