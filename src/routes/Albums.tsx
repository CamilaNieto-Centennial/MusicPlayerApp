import { McCardRectangle, McCarousel } from '../components';
import { topAlbums } from '../constants/albums';

export default function Albums() {

  return (
    <main className="flex flex-col gap-4 h-[100dvh] px-12 py-8 xl:px-8 overflow-y-auto">
      <h3 className="hidden md:block text-xl font-bold">Albums</h3>
      <div className="relative w-full gap-4 flex flex-wrap justify-center lg:justify-between">
        <>
          {
            topAlbums.map((album) => (
              <div className='hidden md:block w-fit'>
                <McCardRectangle item={album} />
              </div>
            ))}

          <div className="block md:hidden">
            <McCarousel
              title="Albums"
              items={topAlbums}
              renderItem={(album) => <McCardRectangle item={album} />}
              hideUrl
            />
          </div>
        </>
      </div>
    </main>
  )
}
