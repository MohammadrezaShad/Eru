import { cn } from '@/helpers';
import Image from 'next/image';

export default function ImageCard({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <div className="relative overflow-hidden rounded-2xl">
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
