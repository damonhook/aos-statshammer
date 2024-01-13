import { Container, Flex, Title } from "@mantine/core"

interface PageContainerProps {
  title: string
  rightSection?: React.ReactNode
  children?: React.ReactNode
}

export default function PageContainer(props: PageContainerProps) {
  const { title, rightSection, children } = props
  return (
    <Container size="xl" p="lg">
      <Flex justify="space-between" mb="1rem" align="center">
        <Title>{title}</Title>
        {rightSection}
      </Flex>
      {children}
    </Container>
  )
}
