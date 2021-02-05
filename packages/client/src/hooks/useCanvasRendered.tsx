import { useCallback, useEffect, useState } from 'react'

interface UseCanvasRenderedProps {
  ref: React.RefObject<any>
  callback: () => void
  delay?: number
}

const useCanvasRendered = ({ ref, callback, delay = 100 }: UseCanvasRenderedProps) => {
  const [found, setFound] = useState(false)
  const [startTimer, setStartTimer] = useState(false)

  const handleCallback = useCallback(
    (n: any) => {
      if (n) {
        const canvasList = Array.from(n.getElementsByTagName('canvas'))
        if (canvasList && canvasList.length) {
          setFound(true)
          callback()
        }
      }
    },
    [callback]
  )

  useEffect(() => {
    let timerId: any = undefined
    if (startTimer && !found) {
      timerId = setTimeout(() => handleCallback(ref.current), delay)
    } else {
      clearTimeout(timerId)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [startTimer, callback, delay, handleCallback, ref, found])

  useEffect(() => {
    if (ref && ref.current) setStartTimer(true)
  }, [ref])
}

export default useCanvasRendered
