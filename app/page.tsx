// wish-card generator using image 2, and auto-playing song.
import PookalamCanvas from "@/components/pookalam-canvas"
import WishCardGenerator from "@/components/wish-card-generator"
import AutoYouTube from "@/components/auto-youtube"

export default function Page() {
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
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-balance text-4xl font-semibold text-orange-700">Happy Onam</h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-neutral-700">Onam Wishing</p>
        </header>

        <section className="mx-auto mt-8">
          <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur">
            <h2 className="mb-4 text-center text-lg font-medium text-neutral-800">Pookalam</h2>
            <div className="flex justify-center">
              <PookalamCanvas size={520} />
            </div>
            <p className="mt-4 text-center text-sm text-neutral-600">Wishing you a joyous and prosperous Onam!</p>
          </div>
        </section>
      </div>

      {/* Floating icon opens the generator; wish card is available via this icon only */}
      <WishCardGenerator />
      {/* Autoplay song from the Shorts link (muted by default with toggle) */}
      <AutoYouTube videoId="dUs4mAHzw74" />
    </main>
  )
}
