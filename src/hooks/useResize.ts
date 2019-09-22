import React, { useEffect } from 'react'

export default function useResize(
  ref: React.RefObject<HTMLDivElement>,
  cb: () => void
) {
  useEffect(() => {
    const target = ref.current
    if (target) window.addEventListener('resize', cb)
    return () => {
      if (target) window.removeEventListener('resize', cb)
    }
  }, [ref, cb])
}
