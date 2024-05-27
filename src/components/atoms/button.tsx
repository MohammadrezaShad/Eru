import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/helpers';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-content-variant hover:bg-primary/90',
        outline: 'border border-input bg-transparent',
        text: 'bg-transparent',
      },
      shade: {
        primary: 'bg-primary text-content-variant hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'bg-success text-content-variant hover:bg-success/90',
        danger: 'bg-danger text-content-variant hover:bg-danger/90',
        info: 'bg-info text-content-variant hover:bg-info/90',
        warning: 'bg-warning text-content-variant hover:bg-warning/90',
        background: 'bg-background text-content-variant hover:bg-background/90',
        backgroundSecondary:
          'bg-background-secondary text-content-variant hover:bg-background/90',
        backgroundVariant:
          'bg-background-variant text-content-variant hover:bg-background/90',
        stroke: 'bg-stroke text-content-variant hover:bg-stroke/90',
        strokeVariant:
          'bg-stroke-variant text-content-variant hover:bg-stroke/90',
        content: 'bg-content text-content-variant hover:bg-content/90',
        contentSecondary:
          'bg-content-secondary text-content-variant hover:bg-content/90',
        contentVariant:
          'bg-content-variant text-content-variant hover:bg-content/90',
        none: '',
      },
      borderShade: {
        primary: 'border-primary text-content-variant hover:border-primary/90',
        secondary:
          'border-secondary text-secondary-foreground hover:border-secondary/80',
        success: 'border-success text-content-variant hover:border-success/90',
        danger: 'border-danger text-content-variant hover:border-danger/90',
        info: 'border-info text-content-variant hover:border-info/90',
        warning: 'border-warning text-content-variant hover:border-warning/90',
        background:
          'border-background text-content-variant hover:border-background/90',
        backgroundSecondary:
          'border-background-secondary text-content-variant hover:border-background/90',
        backgroundVariant:
          'border-background-variant text-content-variant hover:border-background/90',
        stroke: 'border-stroke text-content-variant hover:border-stroke/90',
        strokeVariant:
          'border-stroke-variant text-content-variant hover:border-stroke/90',
        content: 'border-content text-content-variant hover:border-content/90',
        contentSecondary:
          'border-content-secondary text-content-variant hover:border-content/90',
        contentVariant:
          'border-content-variant text-content-variant hover:border-content/90',
        none: '',
      },
      textShade: {
        primary: 'text-primary hover:text-primary/90',
        secondary: 'text-secondary hover:text-secondary/80',
        success: 'text-success hover:text-success/90',
        danger: 'text-danger hover:text-danger/90',
        info: 'text-info hover:text-info/90',
        warning: 'text-warning  hover:text-warning/90',
        background: 'text-background  hover:text-background/90',
        backgroundSecondary:
          'text-background-secondary  hover:text-background/90',
        backgroundVariant: 'text-background-variant  hover:text-background/90',
        stroke: 'text-stroke  hover:text-stroke/90',
        strokeVariant: 'text-stroke-variant  hover:text-stroke/90',
        content: 'text-content  hover:text-content/90',
        contentSecondary: 'text-content-secondary  hover:text-content/90',
        contentVariant: 'text-content-variant hover:text-content/90',
        none: '',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      shade: 'primary',
      variant: 'outline',
      size: 'default',
    },
  },
);
export interface ButtonProp
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProp, 'borderShade' | 'textShade'>
>(({ className, variant, size, shade, ...props }, ref) => {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          shade: variant === 'default' ? shade : 'none',
          borderShade: variant === 'outline' ? shade : 'none',
          textShade: variant === 'text' ? shade : 'none',
          className,
        }),
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button as BTN };
