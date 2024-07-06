import { IconVideo } from '@/assets';
import { cn } from '@/helpers';
import Image from 'next/image';

export default function VideoCard({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <div className="relative overflow-hidden rounded-2xl">
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary">
          <IconVideo />
        </span>
        <Image
          src="https://api.paraj.ir/images/6651ddc8c29f737001dfc101"
          alt="video image"
          width={309}
          height={208}
        />
      </div>
      <span className="mt-4 block text-sm text-foreground">
        تریلر یک زندگی زیبا
      </span>
    </div>
  );
}
