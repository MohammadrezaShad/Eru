import { cn } from '@/helpers';

export default function Multimedia({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex gap-8', className)} {...otherProps}>
      Multimedia
    </div>
  );
}
