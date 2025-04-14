import { genres } from '../constants/genres'
import { McCardColor } from '../components'

export default function Genres() {
  return (
    <main className="flex flex-col gap-4 p-8 overflow-y-auto">
      <h3 className="text-xl font-bold">Genres</h3>
      <div className="relative w-full flex gap-4 flex-wrap">
        {
          genres.map((genre) => (
            <McCardColor item={genre} />
          ))}
      </div>
    </main>
  )
}
