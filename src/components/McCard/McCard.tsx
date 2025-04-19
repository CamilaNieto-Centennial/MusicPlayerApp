import { truncateText } from '../../utils/truncateText';
import { BaseArtistType, BaseCardDataType } from '../../types/spotify'
import { MdPlayArrow } from 'react-icons/md'
import { ColorItemType } from '../../types/genres';
import { useNavigate } from 'react-router-dom';
interface McCardRectangleType<T extends BaseCardDataType> {
  item: T
  className?: string
}

export const McCardRectangle = <T extends BaseCardDataType>({ item, className }: McCardRectangleType<T>) => {
  const navigate = useNavigate();
  const handleNavigation = (route: string) => {
    navigate(route);
  };
  return (
    <div key={item.id} onClick={() => handleNavigation("/favourites")} className={`w-fit flex flex-col gap-3 shrink-0 ${className}`}>
      <div className="relative overflow-hidden rounded-md shadow-sm group">
        <img
          alt={item.name}
          className="w-[240px] h-[140px] object-cover cursor-pointer transition-all duration-500 ease-in-out group-hover:scale-110"
          src={item.images[0].url}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
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
}

interface McCardRoundedType<T extends BaseArtistType> {
  item: T
  className?: string
}

export const McCardRounded = <T extends BaseArtistType>({ item, className }: McCardRoundedType<T>) => {
  const navigate = useNavigate();
  const handleNavigation = (route: string) => {
    navigate(route);
  };
  return (
    <div key={item.id} onClick={() => handleNavigation("/favourites")} className={`w-fit flex flex-col gap-3 shrink-0 ${className}`}>
      <div className="relative overflow-hidden rounded-full shadow-sm group">
        <img
          alt={item.name}
          className="w-[180px] h-[180px] object-cover cursor-pointer transition-all duration-500 ease-in-out group-hover:scale-110"
          src={item.images?.[0]?.url || '/placeholder.png'}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
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
}

interface McCardColorType {
  item: ColorItemType
  className?: string
}

const createColorImage = (colors: string[]) => {
  const gradientStops = colors
    .map((color, index) => `<stop offset="${(index / (colors.length - 1)) * 100}%" stop-color="${color}" />`)
    .join('');

  const svg = `
    <svg width="240" height="140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          ${gradientStops}
        </linearGradient>
      </defs>
      <rect width="240" height="140" fill="url(#grad)" rx="12" ry="12"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};


export const McCardColor = ({ item, className }: McCardColorType) => {
  const navigate = useNavigate();
  const handleNavigation = (route: string) => {
    navigate(route);
  };
  return (
    <div key={item.id} onClick={() => handleNavigation("/favourites")} className={`w-fit flex flex-col gap-3 shrink-0 ${className}`}>
      <div className="relative overflow-hidden rounded-md shadow-sm group">
        <img
          alt={item.title}
          className="w-[240px] h-[140px] object-cover cursor-pointer ease-in-out"
          src={createColorImage(item.colors)}
        />
        <p className="absolute top-[38%] left-1/2 -translate-x-1/2 px-2 py-1 cursor-pointer text-lg text-zinc-900 font-semibold uppercase hover:scale-110 transition-all duration-500 max-w-[90%]">
          {truncateText(item.title, 20)}
        </p>
      </div>
    </div>
  )
}