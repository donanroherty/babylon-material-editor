import React, { useEffect } from 'react'

export default function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  outsideClickHandler: () => void
) {
  const clickHandler = (e: any) => {
    if (!ref.current) return
    if (!ref.current.contains(e.target)) outsideClickHandler()
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickHandler)
    return () => {
      document.removeEventListener('mousedown', outsideClickHandler)
    }
  })
}
