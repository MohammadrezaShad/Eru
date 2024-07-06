import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@ui/navigation-menu';
import { Home } from '@/routes';
import { cn } from '@/helpers';

export default function Navigation({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Home.Link className="px-4 text-base text-foreground">
              مقالات
            </Home.Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Home.Link className="px-4 text-base text-foreground">
              رسانه
            </Home.Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
