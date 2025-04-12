import { SpotifyAlbumType } from '../../types/spotify'
import { MdPlayArrow } from 'react-icons/md'

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export const McCard = ({ album, className }: { album: SpotifyAlbumType, className?: string }) => (
  <div key={album.id} className={`w-fit flex flex-col gap-3 shrink-0 ${className}`}>
    <div className="relative overflow-hidden rounded-md shadow-sm group">
      <img
        alt={album.name}
        className="w-[240px] h-[140px] object-cover cursor-pointer transition-all duration-500 ease-in-out group-hover:scale-110"
        src={album.images[0].url}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <div className="bg-white p-3 rounded-full shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-in-out">
          <MdPlayArrow className="text-black w-7 h-7" />
        </div>
      </div>
    </div>
    <div className="flex flex-col max-w-[240px]">
      <p className='text-base text-zinc-100 font-medium truncate cursor-pointer hover:text-primary500 transition-all duration-150'>{truncateText(album.name, 26)}</p>
      <p className='text-sm text-zinc-400 truncate'>{truncateText(album.artists.map((artist) => artist.name).join(', '), 33)}</p>
    </div>
  </div>
)
