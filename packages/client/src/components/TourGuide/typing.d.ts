import { ReactourProps } from 'reactour'

// @types/reactour is missing type declarations for `CustomHelper`
// (see: https://github.com/elrumordelaluz/reactour/issues/260)

declare module 'reactour' {
  interface CustomHelperProps {
    current: number
    totalSteps: number
    gotoStep: (step: number) => void
    close: () => void
    content: React.ReactNode | ((args: ReactourStepContentArgs) => React.ReactNode)
  }

  interface ReactourProps {
    CustomHelper?: ({ ...props }: CustomHelperProps) => React.ReactElement
  }
}
