import { genres } from '../constants/genres'
import { McCardColor, McCarousel } from '../components'

export default function Genres() {
  return (
    <main className="flex flex-col gap-4 px-12 py-8 xl:px-8 overflow-y-auto">
      <h3 className="hidden md:block text-xl font-bold">Genres</h3>
      <div className="hidden md:flex relative w-full gap-4 flex-wrap justify-center lg:justify-between">
        {
          genres.map((genre) => (
            <McCardColor item={genre} />
          ))}
      </div>
      <div className="block md:hidden">
        <McCarousel
          title="Genres"
          items={genres}
          isLoading={false}
          itemsPerSlide={8}
          isColor
          renderItem={(genre) => <McCardColor item={genre} />}
          hideUrl
        />
      </div>
    </main>
  )
}
