import { CastAndCrewCard } from '@/components';
import { cn } from '@/helpers';
import { Card, CardContent } from '@ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@ui/carousel';
import { ChevronLeft } from 'lucide-react';

export default function CastAndCrewCarousel({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div dir="rtl" className={cn('', className)} {...otherProps}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg">ستارگان فیلم یک زندگی زیبا</h2>
        <span className="flex cursor-pointer items-center text-foreground-alt">
          بیشتر
          <ChevronLeft className="mr-1 h-4 w-4" />
        </span>
      </div>
      <Carousel opts={{ direction: 'rtl', align: 'start' }} className="w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 15 }).map((_, index) => (
            <CarouselItem key={index} className="basis-[183px] pl-1">
              <div className="h-full p-3">
                <Card className="h-full">
                  <CardContent className="flex h-full items-center justify-center">
                    <CastAndCrewCard />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
