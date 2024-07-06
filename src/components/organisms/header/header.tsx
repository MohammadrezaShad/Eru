import { Logo } from '@/components';
import { cn } from '@/helpers';

import Navigation from './navigation';
import TopBar from './top-bar';
import Drawer from './drawer';

export default function Header({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn('bg-background-variant px-8', className)}
      {...otherProps}
    >
      <div className="max-w-8xl mx-auto flex items-center gap-10 py-5 md:justify-between md:py-3">
        <Drawer className="hidden md:block" />
        <Logo />
        <Navigation className="md:hidden" />
        <TopBar className="mr-auto md:mr-0" />
      </div>
    </header>
  );
}
