"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { VolumeX, Volume2 } from "lucide-react"

export interface AudioControlRef {
  play: () => void
  stop: () => void
}

/**
 * YouTube audio player with automatic start and external control.
 */
const AutoYouTube = forwardRef<AudioControlRef, { videoId?: string }>(({ videoId = "VrrnflVEiMg" }, ref) => {
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
    const timer = setTimeout(() => {
      setIsPlaying(true)
    }, 500) // Start after 0.5 seconds for better user experience

    return () => clearTimeout(timer)
  }, [])

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
        title="Thiruvavani Ravu - Onam Music"
        allow="autoplay; encrypted-media"
        className="h-0 w-0 opacity-0"
        src={`${base}&autoplay=1&mute=0`}
      />

      <Button
        onClick={() => setIsPlaying(!isPlaying)}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur hover:bg-white/100 transition-all shadow-lg flex items-center gap-2"
      >
        {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="text-sm font-medium">{isPlaying ? "Freeze Song" : "Play Song"}</span>
      </Button>
    </div>
  )
})

AutoYouTube.displayName = "AutoYouTube"

export default AutoYouTube
