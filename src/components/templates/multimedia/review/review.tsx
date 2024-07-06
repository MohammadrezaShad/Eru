import { Separator } from '@ui/separator';
import { cn } from '@/helpers';
import { ChevronDown, ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

export default function Review({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl bg-background-variant',
        className,
      )}
      {...otherProps}
    >
      <h2 className="bg-background-alt p-6">نقد و بررسی کاربران </h2>
      <div className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <Image
            src="https://api.paraj.ir/images/6651ddc8c29f737001dfc101"
            alt="user"
            width={40}
            height={40}
            className="h-10 w-10 overflow-hidden rounded-full object-cover"
          />
          <span>Negin.N</span>
          <span className="text-xs text-foreground-variant">2 ساعت پیش</span>
        </div>
        <p className="pr-14 text-justify text-foreground-variant">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </p>
        <div className="mt-6 flex items-center gap-5 pr-14">
          <span className="flex items-center gap-3">
            <ThumbsDown />
            <span>0</span>
          </span>
          <span className="flex items-center gap-3">
            <ThumbsUp />
            <span>2</span>
          </span>
        </div>
      </div>
      <Separator className="bg-stroke-variant" />
      <div className="px-20 py-6">
        <span className="flex cursor-pointer items-center text-foreground">
          بیشتر
          <ChevronDown className="mr-1 h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
