import { CastAndCrewCarousel } from '@/components';
import { Separator } from '@ui/separator';
import { cn } from '@/helpers';

export default function CastAndCrew({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <CastAndCrewCarousel />
      <Separator className="my-6 bg-stroke" />
      <CastAndCrewCarousel />
    </div>
  );
}
