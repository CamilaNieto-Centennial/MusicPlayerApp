import { McCardRounded, McCarousel } from '../components';
import { trendingArtists } from '../constants/artists';

export default function Artists() {
  return (
    <main className="flex flex-col gap-4 h-[100dvh] px-12 py-8 xl:px-8 overflow-y-auto">
      <h3 className="hidden md:block text-xl font-bold">Artists</h3>
      <div className="relative w-full flex gap-[17px] flex-wrap justify-center lg:justify-between">
        <>
          {
            trendingArtists.map((artist) => (
              <div className='hidden md:block w-fit'>
                <McCardRounded item={artist} />
              </div>
            ))}

          <div className="block md:hidden">
            <McCarousel
              title="Artists"
              items={trendingArtists}
              isRounded
              renderItem={(artist) => <McCardRounded item={artist} />}
              hideUrl
            />
          </div>
        </>
      </div>
    </main>
  )
}
