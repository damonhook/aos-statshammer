import { useEffect, useRef } from 'react'
/**
 * A hook used to hold the state from the previous render
 * @param state The state top keep track of
 */
function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current as T
}

export default usePrevious
