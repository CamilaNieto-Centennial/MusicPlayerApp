import { podcasts } from '../constants/podcasts'
import { McCardRectangle, McCarousel } from '../components'

export default function Podcast() {
  return (
    <main className="flex flex-col gap-4 px-12 py-8 xl:px-8 overflow-y-auto">
      <h3 className="hidden md:block text-xl font-bold">Podcasts</h3>
      <div className="hidden md:flex relative w-full gap-4 flex-wrap justify-center lg:justify-between">
        {
          podcasts.map((podcast) => (
            <McCardRectangle item={podcast} />
          ))}
      </div>
      <div className="block md:hidden">
        <McCarousel
          title="Podcasts"
          items={podcasts}
          isLoading={false}
          renderItem={(podcast) => <McCardRectangle item={podcast} />}
          hideUrl
        />
      </div>
    </main>
  )
}
