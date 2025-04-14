import { podcasts } from '../constants/podcasts'
import { McCardRectangle } from '../components'

export default function Podcast() {
  return (
    <main className="flex flex-col gap-4 p-8 overflow-y-auto">
      <h3 className="text-xl font-bold">Podcasts</h3>
      <div className="relative w-full flex gap-4 flex-wrap">
        {
          podcasts.map((genre) => (
            <McCardRectangle item={genre} />
          ))}
      </div>
    </main>
  )
}
