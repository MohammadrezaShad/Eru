import { cn } from '@/helpers';
import { Home, Newspaper, Search, User } from 'lucide-react';
import { Home as HomeRoute } from '@/routes';
import { headers } from 'next/headers';
import { HeadersName } from '@/constants';

export default function AppBar({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  const currentUrl = headers().get(HeadersName.Pathname);
  console.log({ currentUrl });
  return (
    <div
      className={cn(
        'fixed bottom-0 w-full rounded-t-2xl bg-background-variant',
        className,
      )}
      {...otherProps}
    >
      <ul className="flex w-full flex-row-reverse justify-between gap-6 px-12 py-6">
        <li>
          <HomeRoute.Link>
            <Home />
          </HomeRoute.Link>
        </li>
        <li>
          <HomeRoute.Link>
            <Search />
          </HomeRoute.Link>
        </li>
        <li>
          <HomeRoute.Link>
            <Newspaper />
          </HomeRoute.Link>
        </li>
        <li>
          <HomeRoute.Link>
            <User />
          </HomeRoute.Link>
        </li>
      </ul>
    </div>
  );
}
