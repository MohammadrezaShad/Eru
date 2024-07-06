import { cn } from '@/helpers';
import Image from 'next/image';

export default function CastAndCrewCard({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <div className="relative overflow-hidden rounded-full">
        <Image
          src="https://api.paraj.ir/images/6651ddc8c29f737001dfc101"
          alt="video image"
          width={155}
          height={155}
          className="h-[155px] w-[155px] object-cover"
        />
      </div>
      <span className="mt-4 block text-center text-sm text-foreground">
        تریلر یک زندگی زیبا
      </span>
    </div>
  );
}
