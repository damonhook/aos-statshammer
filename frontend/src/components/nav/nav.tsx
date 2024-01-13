import { UnstyledButton } from "@mantine/core"
import classes from "./nav.module.css"
import { Link } from "@tanstack/react-router"

export default function Nav() {
  return (
    <>
      <UnstyledButton component={Link} to="/units" className={classes.control}>
        Units
      </UnstyledButton>
      <UnstyledButton component={Link} to="/units" className={classes.control}>
        Target
      </UnstyledButton>
      <UnstyledButton component={Link} to="/units" className={classes.control}>
        Average
      </UnstyledButton>
      <UnstyledButton component={Link} to="/units" className={classes.control}>
        Simulate
      </UnstyledButton>
    </>
  )
}
