import { Separator } from '@ui/separator';
import { cn } from '@/helpers';
import { BookmarkPlus, ChevronLeft, Mic, Share2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@ui/button';
import { IconGallery, IconVideoSquare } from '@/assets';

export default function Preview({
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex h-[468px] gap-2', className)} {...otherProps}>
      <div className="relative basis-[312px] overflow-hidden rounded-2xl">
        <Image
          src="https://api.paraj.ir/images/660b8ae07657152dff72a6db"
          alt="عکس فیلم"
          fill
        />
      </div>
      <div className="relative flex-1  overflow-hidden rounded-2xl">
        <Image
          src="https://api.paraj.ir/images/660b8b9a7657152dff73cce5"
          alt="عکس فیلم"
          fill
          objectFit="cover"
        />
      </div>
      <div className="flex basis-[364px] flex-col gap-6 overflow-hidden  rounded-2xl bg-background-variant p-6">
        <div className="flex items-center gap-4">
          <Share2 size={24} className="cursor-pointer" />
          <BookmarkPlus size={24} className="cursor-pointer" />
        </div>
        <div className="flex h-[128px] cursor-pointer items-center overflow-hidden rounded-2xl bg-background-alt px-8 py-6">
          <IconVideoSquare />
          <span className="pr-3 text-xl">نمایش ویدئو ها</span>
          <ChevronLeft className="mr-auto" />
        </div>
        <div className="flex h-[128px] cursor-pointer items-center overflow-hidden rounded-2xl bg-background-alt px-8 py-6">
          <IconGallery />
          <span className="pr-3 text-xl">نمایش عکس ها</span>
          <ChevronLeft className="mr-auto" />
        </div>
        <Separator className="bg-foreground-variant" />
        <div className="flex justify-end">
          <Button variant="foreground">
            <Mic className="ml-2" />
            پادکست
          </Button>
        </div>
      </div>
    </div>
  );
}
