import { UnstyledButton } from "@mantine/core"
import classes from "./nav.module.css"
import { Link } from "@tanstack/react-router"

interface NavProps {
  items: { name: string; path: string }[]
}

export default function Nav(props: NavProps) {
  const { items } = props
  return (
    <>
      {items.map(({ name, path }) => (
        <UnstyledButton component={Link} to={path} className={classes.control}>
          {name}
        </UnstyledButton>
      ))}
    </>
  )
}
