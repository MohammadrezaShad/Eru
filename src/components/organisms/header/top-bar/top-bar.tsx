import { cn } from '@/helpers';
import { Home } from '@/routes';
import { Search, User } from 'lucide-react';

export default function TopBar({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex gap-8', className)} {...otherProps}>
      <Home.Link className="md:hidden">
        <User />
      </Home.Link>
      <Home.Link>
        <Search />
      </Home.Link>
    </div>
  );
}
