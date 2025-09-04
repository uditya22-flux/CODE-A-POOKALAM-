"use client"

// wish-card generator using image 2, and click-to-play song.
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Palette, Upload } from "lucide-react"
import PookalamCanvas from "@/components/pookalam-canvas"
import WishCardGenerator from "@/components/wish-card-generator"
import AutoYouTube, { type AudioControlRef } from "@/components/auto-youtube"
import PookalamBuilderPortal from "@/components/pookalam-builder-portal"
import UserPookalamPortal from "@/components/user-pookalam-portal"
import FallingFlowers from "@/components/falling-flowers"

export default function Page() {
  const audioRef = useRef<AudioControlRef>(null)
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const handlePookalamClick = () => {
    audioRef.current?.play()
  }

  return (
    <main
      className="min-h-dvh w-full"
      style={{
        // Use the provided Source URL (Image 3)
        backgroundImage:
          'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4ac03189aa6de142a22cc688fee0218.jpg-zxGthRdhCLTiUQx9dIwdIqnHcmOpIj.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <FallingFlowers />

      <div className="mx-auto max-w-6xl px-4 py-10 relative z-10">
        <header className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-balance text-4xl font-semibold text-orange-700">Happy Onam</h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-neutral-700">Onam Wishing</p>
        </header>

        <section className="mx-auto mt-8">
          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur">
            <h2 className="mb-4 text-center text-lg font-medium text-neutral-800">Pookalam</h2>
            <div className="flex justify-center">
              <PookalamCanvas size={520} onClick={handlePookalamClick} />
            </div>
            <p className="mt-4 text-center text-sm text-neutral-600">Wishing you a joyous and prosperous Onam!</p>
            <p className="mt-2 text-center text-xs text-orange-600 font-medium">Click the pookalam for some noise</p>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <section>
            <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur text-center h-full">
              <h2 className="mb-4 text-lg font-medium text-neutral-800">Create Your Own Pookalam</h2>
              <p className="mb-6 text-sm text-neutral-600">
                Design your own beautiful Pookalam using traditional Kerala flowers
              </p>
              <Button
                onClick={() => setIsBuilderOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-medium"
              >
                <Palette className="mr-2 h-5 w-5" />
                Start Creating
              </Button>
            </div>
          </section>

          <section>
            <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur text-center h-full">
              <h2 className="mb-4 text-lg font-medium text-neutral-800">Share Your Pookalam</h2>
              <p className="mb-6 text-sm text-neutral-600">
                Upload photos of your real Pookalam designs and share them with others
              </p>
              <Button
                onClick={() => setIsUploadOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Design
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Floating icon opens the generator; wish card is available via this icon only */}
      <WishCardGenerator />
      <AutoYouTube ref={audioRef} videoId="dUs4mAHzw74" />

      <PookalamBuilderPortal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />
      <UserPookalamPortal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </main>
  )
}
