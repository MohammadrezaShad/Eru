import { cn } from '@/helpers';
import Image from 'next/image';

export default function MagCard({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="https://api.paraj.ir/images/6651ddc8c29f737001dfc101"
          alt="video image"
          width={318}
          height={214}
          className="h-[214px] w-[318px] object-cover"
        />
      </div>
      <span className="mt-4 block text-sm text-foreground">
        آخرین اخبار فیلم اوپنهایمر (Oppenheimer) جدیدترین فیلم کریستوفر نولان
      </span>
    </div>
  );
}
