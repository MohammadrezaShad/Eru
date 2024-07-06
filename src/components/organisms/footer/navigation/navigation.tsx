import { Home } from '@/routes';
import { cn } from '@/helpers';
import { ChevronLeft } from 'lucide-react';

export default function Navigation({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...otherProps}>
      <span className="mb-8 block text-2xl">پاراج</span>
      <ul className="flex flex-col gap-6">
        <li className="flex items-center gap-2">
          <ChevronLeft className="stroke-primary" size={16} />
          <Home.Link className="text-base">درباره ما</Home.Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronLeft className="stroke-primary" size={16} />
          <Home.Link>تماس با ما</Home.Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronLeft className="stroke-primary" size={16} />
          <Home.Link>DMCA</Home.Link>
        </li>
      </ul>
    </div>
  );
}
