import { useState, useEffect, useRef } from 'react'

export default function useComponentVisible(initial: Boolean) {
  const [open, setOpen] = useState<Boolean>(initial)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      (event: MouseEvent) => handleClickOutside(event),
      true
    )
    return () => {
      document.removeEventListener('mousedown', () => handleClickOutside, true)
    }
  }, [open])

  return { ref, open, setOpen }
}
