import { Title, Paper, Text, Flex, Box } from "@mantine/core"
import React from "react"
import classes from "./feature-card.module.css"

interface FeatureCardProps {
  title: string
  icon: React.ReactNode
  children?: React.ReactNode
}

export default function FeatureCard(props: FeatureCardProps) {
  const { title, icon, children } = props
  return (
    <Paper className={classes.root}>
      <Flex align="center" pb="xs">
        <Box className={classes.icon} mr="xs">
          {icon}
        </Box>
        <Title order={3} size="md" fw={500}>
          {title}
        </Title>
      </Flex>
      <Text c="dimmed">{children}</Text>
    </Paper>
  )
}
