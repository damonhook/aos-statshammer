import type { TooltipPayload } from 'recharts'

export interface TooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string | number
}
