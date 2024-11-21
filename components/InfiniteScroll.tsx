import { useEffect, useRef } from "react"

interface InfiniteScrollProps {
  onIntersect: () => void
  hasMore: boolean
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onIntersect,
  hasMore,
}) => {
  const loader = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onIntersect()
        }
      },
      { rootMargin: "400px" }
    )

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => observer.disconnect()
  }, [onIntersect, hasMore])

  return hasMore ? <div ref={loader} className='loading' /> : null
}
