import { Skeleton } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type McCarouselType<T> = {
  title: string;
  items: T[];
  isLoading: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  hideUrl?: boolean;
  url?: string;
  isColor?: boolean;
  isRounded?: boolean;
  itemsPerSlide?: number;
};

export const McCarousel = <T,>({
  title,
  items,
  isLoading,
  renderItem,
  hideUrl,
  url,
  isColor,
  isRounded,
  itemsPerSlide: propItemsPerSlide
}: McCarouselType<T>) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(propItemsPerSlide ?? ((isRounded || isColor) ? 8 : 7));
  const maxSlide = Math.max(items.length - itemsPerSlide, 0);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  // Next and Previous buttons to control the slider
  const handlePrev = () => {
    if (currentSlide > 0) {
      setFade(true);
      setTimeout(() => {
        setCurrentSlide(prev => Math.max(prev - itemsPerSlide, 0));
        setFade(false);
      }, 150);
    }
  };

  const handleNext = () => {
    if (currentSlide < maxSlide) {
      setFade(true);
      setTimeout(() => {
        setCurrentSlide(prev => Math.min(prev + itemsPerSlide, maxSlide));
        setFade(false);
      }, 150);
    }
  }

  // 👇 Responsive breakpoints
  useEffect(() => {
    // if (wasItemsPerSlideProvided) return;

    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (isRounded || isColor) {
        if (width >= 1950) setItemsPerSlide(9);
        else if (width >= 1700) setItemsPerSlide(8);
        else if (width >= 1450) setItemsPerSlide(7);
        else if (width >= 1180) setItemsPerSlide(6);
        else if (width >= 950) setItemsPerSlide(5);
        else if (width >= 750) setItemsPerSlide(4);
        else if (width >= 600) setItemsPerSlide(3);
        else if (width >= 370) setItemsPerSlide(2);
        else setItemsPerSlide(1);
      } else {
        if (width >= 1900) setItemsPerSlide(8);
        else if (width >= 1650) setItemsPerSlide(7);
        else if (width >= 1400) setItemsPerSlide(6);
        else if (width >= 1200) setItemsPerSlide(5);
        else if (width >= 900) setItemsPerSlide(4);
        else if (width >= 650) setItemsPerSlide(3);
        else if (width >= 370) setItemsPerSlide(2);
        else setItemsPerSlide(1);
      }
    };

    updateItemsPerSlide();

    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const gapClass = useMemo(() => {
    if (isRounded) {
      if (itemsPerSlide === 9) return 'gap-12';
      if (itemsPerSlide === 8) return 'gap-12';
      if (itemsPerSlide === 7) return 'gap-10';
      if (itemsPerSlide === 6) return 'gap-8';
      if (itemsPerSlide === 5) return 'gap-6';
      if (itemsPerSlide === 4) return 'gap-6';
      if (itemsPerSlide === 3) return 'gap-4';
      if (itemsPerSlide === 2) return 'gap-2';
      return 'gap-10';
    } else {
      if (itemsPerSlide === 9) return 'gap-2';
      if (itemsPerSlide === 8) return 'gap-4';
      if (itemsPerSlide === 7) return 'gap-4';
      if (itemsPerSlide === 6) return 'gap-4';
      if (itemsPerSlide === 5) return 'gap-4';
      if (itemsPerSlide === 4) return 'gap-6';
      if (itemsPerSlide === 3) return 'gap-4';
      if (itemsPerSlide === 3) return 'gap-4';
      return 'gap-6';
    }
  }, [itemsPerSlide, isRounded]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-bold">{title}</h3>
        {hideUrl ? <></> : <p onClick={() => handleNavigation(url ?? "")} className="font-bold hover:underline cursor-pointer">Show all</p>}
      </div>
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="flex gap-4">
            {isLoading
              ? Array.from({ length: itemsPerSlide }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3 w-fit shrink-0">
                  <Skeleton className="rounded-md">
                    <img className="w-[240px] h-[140px] rounded-md bg-default-300" />
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                  </Skeleton>
                </div>
              ))
              : <div className={`${gapClass} flex transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                {
                  items.slice(currentSlide, currentSlide + itemsPerSlide).map((item, id) => (
                    <div key={id} className="flex justify-center">
                      {renderItem(item, id)}
                    </div>
                  ))}
              </div>
            }
          </div>
        </div>

        {/* Prev Button */}
        <div className={`absolute top-[40%] left-0 transform -translate-y-1/2 px-2 z-10 ${isColor ? "top-[50%]" : "top-[40%]"}`}>
          <div
            onClick={handlePrev}
            className="bg-zinc-900 p-2 rounded-full shadow-md transform scale-95 hover:scale-100 hover:bg-zinc-800 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <MdArrowBackIos className="pl-[5px]" size="24" />
          </div>
        </div>

        {/* Next Button */}
        <div className={`absolute top-[40%] right-0 transform -translate-y-1/2 px-2 z-10 ${isColor ? "top-[50%]" : "top-[40%]"}`}>
          <div
            onClick={handleNext}
            className="bg-zinc-900 p-2 rounded-full shadow-md transform scale-95 hover:scale-100 hover:bg-zinc-800 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <MdArrowForwardIos className="pl-[5px]" size="24" />
          </div>
        </div>
      </div>
    </div>
  )
}