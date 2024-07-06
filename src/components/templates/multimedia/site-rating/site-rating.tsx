import { IconStar, parajSign } from '@/assets';
import { cn } from '@/helpers';
import Image from 'next/image';

export default function SiteRating({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex gap-8', className)} {...otherProps}>
      <div className="flex items-center gap-2">
        <Image src={parajSign} alt="پاراج" width={30} />
        <span className="text-foreground-variant">9</span>
      </div>
      <div className="flex cursor-pointer items-center gap-2">
        <IconStar />
        <span className="text-foreground-variant">امتیاز شما</span>
      </div>
    </div>
  );
}
