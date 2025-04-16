import { podcasts } from '../constants/podcasts'
import { McCardRectangle } from '../components'

export default function Podcast() {
  return (
    <main className="flex flex-col gap-4 px-12 py-8 xl:px-8 overflow-y-auto">
      <h3 className="text-xl font-bold">Podcasts</h3>
      <div className="relative w-full flex gap-4 flex-wrap justify-between">
        {
          podcasts.map((genre) => (
            <McCardRectangle item={genre} />
          ))}
      </div>
    </main>
  )
}
