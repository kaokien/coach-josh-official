export default function LinksPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">Coach Josh</h1>

      <a href="/cornerman" className="w-full max-w-sm text-center py-3 rounded bg-black text-white">
        Training Programs
      </a>

      <a href="https://instagram.com/yourhandle" className="w-full max-w-sm text-center py-3 rounded border">
        Instagram
      </a>

      <a href="https://youtube.com/yourchannel" className="w-full max-w-sm text-center py-3 rounded border">
        YouTube
      </a>
    </main>
  )
}
