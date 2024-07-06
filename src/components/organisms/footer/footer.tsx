import { Logo } from '@/components';
import { cn } from '@/helpers';

import Navigation from './navigation';
import Description from './description';

export default function Footer({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer className={cn('bg-background-variant', className)} {...otherProps}>
      <div className="px-8">
        <div className="max-w-8xl mx-auto py-8">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Navigation />
        </div>
      </div>
      <Description />
    </footer>
  );
}
