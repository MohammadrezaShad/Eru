import { VideoCard } from '@/components';
import { cn } from '@/helpers';
import { Card, CardContent } from '@ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@ui/carousel';
import { ChevronLeft } from 'lucide-react';

export default function VideoCarousel({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div dir="rtl" className={cn('', className)} {...otherProps}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg">ویدئوها</h2>
        <span className="flex cursor-pointer items-center text-foreground-alt">
          بیشتر
          <ChevronLeft className="mr-1 h-4 w-4" />
        </span>
      </div>
      <Carousel opts={{ direction: 'rtl', align: 'start' }} className="w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-[323px] pl-1">
              <div className="h-full p-1">
                <Card className="h-full">
                  <CardContent className="flex h-full items-center justify-center">
                    <VideoCard />
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
