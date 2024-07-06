import { IconTelegram } from '@/assets';
import { cn } from '@/helpers';

export default function Description({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  const telegramLink = 'https://t.me/parajcom';
  return (
    <div className={cn('bg-background-alt px-8', className)} {...otherProps}>
      <div className="max-w-8xl mx-auto flex justify-between py-6">
        <p className="text-sm">
          خدمات ارایه شده در دُرنیان، دارای مجوز های لازم از مراجع مربوطه
          می‌باشد و هرگونه بهره برداری و سوء استفاده از محتوای دُرنیان، پیگرد
          قانونی دارد.
        </p>
        <a href={telegramLink} referrerPolicy="no-referrer" rel="nofollow">
          <IconTelegram className="cursor-pointer [&>path]:transition-all [&>path]:hover:fill-secondary" />
        </a>
      </div>
    </div>
  );
}
