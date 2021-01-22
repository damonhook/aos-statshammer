import { useEffect, useState } from 'react'

interface DelayedPropertyProps<T> {
  property: T
  delay?: number
}

const useDelayedProperty = <T extends any>({ property, delay = 300 }: DelayedPropertyProps<T>) => {
  const [value, setValue] = useState<T>(property)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setValue(property)
    }, delay)

    return () => clearTimeout(timerId)
  }, [property, delay])

  return value
}

export default useDelayedProperty
