import { Separator } from '@/components/ui/separator';
import { cn } from '@/helpers';

export default function MoreDetails({
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
      <h2 className="bg-background-alt p-6 text-lg">جزییات بیشتر</h2>
      <div className="flex gap-4 p-6">
        <span className="text-bases">تاریخ انتشار</span>
        <span className="text-base text-foreground-variant">
          27 مه 2022 (ایالات متحده آمریکا)
        </span>
      </div>
      <Separator className="bg-stroke-variant" />
      <div className="flex gap-4 p-6">
        <span className="text-bases">کشور مبدا</span>
        <span className="text-base text-foreground-variant">دانمارک </span>
      </div>
      <Separator className="bg-stroke-variant" />
      <div className="flex gap-4 p-6">
        <span className="text-bases">زبان</span>
        <span className="text-base text-foreground-variant">انگلیسی</span>
      </div>
      <Separator className="bg-stroke-variant" />
      <div className="flex gap-4 p-6">
        <span className="text-bases">شناخته شده با عنوان</span>
        <span className="text-base text-foreground-variant">
          سوپر خلبان ماوریک
        </span>
      </div>
      <Separator className="bg-stroke-variant" />
      <div className="flex gap-4 p-6">
        <span className="text-bases">لوکیشن فیلمبرداری</span>
        <span className="text-base text-foreground-variant">
          جنگل ملی الدورادو، کالیفرنیا، ایالات متحده آمریکا (منطقه استقرار
          هواپیماهای کوهستانی جنگلی)
        </span>
      </div>
      <Separator className="bg-stroke-variant" />
      <div className="flex gap-4 p-6">
        <span className="text-bases">شرکت تولیدکننده</span>
        <span className="text-base text-foreground-variant">
          پارامونت پیکچرز، رسانه Skydance، فیلم های جری بروکهایمر
        </span>
      </div>
      <Separator className="bg-stroke-variant" />
      <div className="flex gap-4 p-6">
        <span className="text-bases">بودجه</span>
        <span className="text-base text-foreground-variant">
          170,000,000 دلار (تخمینی)
        </span>
      </div>
    </div>
  );
}
