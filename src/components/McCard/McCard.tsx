import { truncateText } from '../../utils/truncateText';
import { BaseArtist, BaseCardData } from '../../types/spotify'
import { MdPlayArrow } from 'react-icons/md'

interface McCardRectangleType<T extends BaseCardData> {
  item: T
  className?: string
}

export const McCardRectangle = <T extends BaseCardData>({ item, className }: McCardRectangleType<T>) => (
  <div key={item.id} className={`w-fit flex flex-col gap-3 shrink-0 ${className}`}>
    <div className="relative overflow-hidden rounded-md shadow-sm group">
      <img
        alt={item.name}
        className="w-[240px] h-[140px] object-cover cursor-pointer transition-all duration-500 ease-in-out group-hover:scale-110"
        src={item.images[0].url}
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
      <p className='text-base text-zinc-100 font-medium truncate cursor-pointer hover:text-primary500 transition-all duration-150'>{truncateText(item.name, 26)}</p>
      <p className='text-sm text-zinc-400 truncate'>{truncateText(item.artists.map((artist) => artist.name).join(', '), 33)}</p>
    </div>
  </div>
)

interface McCardRoundedType<T extends BaseArtist> {
  item: T
  className?: string
}

export const McCardRounded = <T extends BaseArtist>({ item, className }: McCardRoundedType<T>) => (
  <div key={item.id} className={`w-fit flex flex-col gap-3 shrink-0 ${className}`}>
    <div className="relative overflow-hidden rounded-full shadow-sm group">
      <img
        alt={item.name}
        className="w-[180px] h-[180px] object-cover cursor-pointer transition-all duration-500 ease-in-out group-hover:scale-110"
        src={item.images?.[0]?.url || '/placeholder.png'}
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
    <div className="flex flex-col max-w-[180px]">
      <p className='text-base text-zinc-100 font-medium text-center truncate cursor-pointer hover:text-primary500 transition-all duration-150'>{truncateText(item.name, 26)}</p>
    </div>
  </div>
)