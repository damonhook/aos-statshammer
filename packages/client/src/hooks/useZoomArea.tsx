import { useState } from 'react'

interface ZoomArea {
  x1: number
  x2: number
}
interface FuncProps {
  onMouseDown: (event: any) => void
  onMouseMove: (event: any) => void
  onMouseUp: () => void
  onMouseLeave: () => void
}

const useZoomArea = (callback?: (area: ZoomArea) => void): [Partial<ZoomArea>, FuncProps] => {
  const [start, setStart] = useState<number | undefined>(undefined)
  const [end, setEnd] = useState<number | undefined>(undefined)

  const onZoomStart = (event: any) => {
    if (event?.activeLabel != null) setStart(event.activeLabel)
  }

  const onZoomMove = (event: any) => {
    if (start != null && event?.activeLabel != null) {
      setEnd(event.activeLabel)
    }
  }

  const onZoomCancel = () => {
    setStart(undefined)
    setEnd(undefined)
  }

  const onZoomEnd = () => {
    if (callback && start != null && end != null && start !== end) {
      const area = { x1: Math.min(start, end), x2: Math.max(start, end) }
      callback(area)
    }
    onZoomCancel()
  }

  return [
    { x1: start, x2: end },
    {
      onMouseDown: onZoomStart,
      onMouseMove: onZoomMove,
      onMouseUp: onZoomEnd,
      onMouseLeave: onZoomCancel,
    },
  ]
}

export default useZoomArea
