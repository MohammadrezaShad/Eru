import { parajLogo } from '@/assets';
import { cn } from '@/helpers';
import { Home } from '@/routes';
import Image from 'next/image';

export default function Logo({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Home.Link
      className={cn('relative block h-11 w-24', className)}
      {...otherProps}
    >
      <Image src={parajLogo} alt="پاراج" fill />
    </Home.Link>
  );
}
