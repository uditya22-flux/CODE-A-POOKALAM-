"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { VolumeX } from "lucide-react"

export interface AudioControlRef {
  play: () => void
  stop: () => void
}

/**
 * YouTube audio player with external control via ref.
 */
const AutoYouTube = forwardRef<AudioControlRef, { videoId?: string }>(({ videoId = "dUs4mAHzw74" }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const base = `https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}&controls=0`

  useImperativeHandle(ref, () => ({
    play: () => {
      setIsPlaying(true)
    },
    stop: () => {
      setIsPlaying(false)
    },
  }))

  useEffect(() => {
    if (!iframeRef.current) return
    if (isPlaying) {
      iframeRef.current.src = `${base}&autoplay=1&mute=0`
    } else {
      iframeRef.current.src = `${base}&autoplay=0&mute=1`
    }
  }, [isPlaying, base])

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <iframe
        ref={iframeRef}
        title="Onam Music"
        allow="autoplay; encrypted-media"
        className="h-0 w-0 opacity-0"
        src={`${base}&autoplay=0&mute=1`}
      />

      <Button
        onClick={() => setIsPlaying(false)}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur hover:bg-white/100 transition-all shadow-lg flex items-center gap-2"
        disabled={!isPlaying}
      >
        <VolumeX className="h-4 w-4" />
        <span className="text-sm font-medium">Freeze Song</span>
      </Button>
    </div>
  )
})

AutoYouTube.displayName = "AutoYouTube"

export default AutoYouTube
