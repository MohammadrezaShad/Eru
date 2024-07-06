'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/helpers/cn';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    bufferedValue?: number;
  }
>(({ className, bufferedValue, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'group relative z-10 flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-stroke-alt/30 relative h-1 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="absolute z-20 h-full bg-primary" />
      <div
        className="absolute -z-10 h-full bg-foreground/20"
        style={{ width: `${bufferedValue}%` }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-2 w-2 rounded-full  bg-primary opacity-0  transition-all  focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group-hover:opacity-100" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
