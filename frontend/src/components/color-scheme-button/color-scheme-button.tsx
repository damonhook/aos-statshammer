import {
  ActionIcon,
  ActionIconProps,
  useMantineColorScheme,
} from "@mantine/core"
import { IconSunLow, IconMoon } from "@tabler/icons-react"

type ColorSchemeButtonProps = Omit<ActionIconProps, "children" | "onClick">

export default function ColorSchemeButton(props: ColorSchemeButtonProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon onClick={toggleColorScheme} {...props}>
      {colorScheme == "dark" ? <IconSunLow /> : <IconMoon />}
    </ActionIcon>
  )
}
