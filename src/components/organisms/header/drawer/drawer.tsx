import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@ui/drawer';
import { cn } from '@/helpers';
import { ArrowRight, Menu } from 'lucide-react';

export default function DrawerWrap({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <Drawer direction="right">
        <DrawerTrigger asChild className="cursor-pointer">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="h-screen w-9/12">
          <DrawerHeader>
            <DrawerClose asChild className="cursor-pointer">
              <ArrowRight />
            </DrawerClose>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
