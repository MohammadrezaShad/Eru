import { cn } from '@/helpers';
import { Separator } from '@ui/separator';

export default function Overview({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex h-4 items-center space-x-2', className)}
      {...otherProps}
    >
      <span className="ml-2 text-base">سریال</span>
      <Separator orientation="vertical" />
      <span className="text-base">از سال 2021 تا 2023</span>
      <Separator orientation="vertical" />
      <span className="text-base">TV-MA</span>
      <Separator orientation="vertical" />
      <span className="text-base">زیر 18 سال</span>
      <Separator orientation="vertical" />
      <span className="text-base">58 دقیقه</span>
    </div>
  );
}
