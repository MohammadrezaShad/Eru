import { cn } from '@/helpers';

export default function LimitedList({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex gap-8', className)} {...otherProps}>
      LimitedList
    </div>
  );
}
