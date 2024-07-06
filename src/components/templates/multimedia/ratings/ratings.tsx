import { imdbLogo, metacriticLogo, rottenLogo } from '@/assets';
import { cn } from '@/helpers';
import Image from 'next/image';

export default function Ratings({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex gap-8', className)} {...otherProps}>
      <div className="flex items-center gap-2">
        <Image src={imdbLogo} alt="imdb logo" />
        <span className="text-foreground-variant text-sm">
          <strong className="text-base text-foreground">8.3</strong>/10 • 592
          هزار نفر
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Image src={metacriticLogo} alt="metacritic logo" />
        <span className="text-base text-foreground">76%</span>
      </div>
      <div className="flex items-center gap-3">
        <Image src={rottenLogo} alt="rotten logo" />
        <span className="text-base text-foreground">80%</span>
      </div>
    </div>
  );
}
