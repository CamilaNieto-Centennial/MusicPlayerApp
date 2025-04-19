import { McCardColor, McCardRectangle, McCardRounded, McCarousel } from '../components'
import { genres } from '../constants/genres';
import { topAlbums } from '../constants/albums';
import { trendingArtists } from '../constants/artists';

export default function Music() {

  return (
    <main className="flex flex-col gap-12 h-[100dvh] p-8 overflow-y-auto">
      <McCarousel
        title="Popular Playlists"
        items={topAlbums}
        renderItem={(album) => <McCardRectangle item={album} />}
        url="/albums"
      />
      <McCarousel
        title="Popular Artists"
        items={trendingArtists}
        itemsPerSlide={8}
        isRounded
        renderItem={(artist) => <McCardRounded item={artist} />}
        url="/artists"
      />
      <McCarousel
        title="Genres"
        items={genres}
        itemsPerSlide={7}
        isColor
        renderItem={(genre) => <McCardColor item={genre} />}
        url="/genres"
      />
      <McCarousel
        title="New Releases"
        items={topAlbums.slice(10, 20)}
        renderItem={(album) => <McCardRectangle item={album} />}
        url="/albums"
      />
    </main >
  )
}
