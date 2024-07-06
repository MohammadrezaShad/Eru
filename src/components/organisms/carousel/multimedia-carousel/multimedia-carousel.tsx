import { cn } from '@/helpers';
import { Card, CardContent } from '@ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@ui/carousel';

export default function MultimediaCarousel({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div dir="rtl" className={cn('', className)} {...otherProps}>
      <Carousel opts={{ direction: 'rtl', align: 'start' }} className="w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-[206px] basis-[323px] pl-1">
              <div className="h-full p-1">
                <Card className="h-full">
                  <CardContent className="flex h-full items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
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
