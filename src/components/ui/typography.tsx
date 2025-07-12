import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    weight: {
      thin: 'font-thin',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
  },
  defaultVariants: {
    variant: 'p',
    size: 'base',
    weight: 'normal',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, size, weight, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={cn(typographyVariants({ variant, size, weight }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = 'Typography';

// Specific typography components
const H1 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h1" className={className} as="h1" {...props} />
  )
);
H1.displayName = 'H1';

const H2 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h2" className={className} as="h2" {...props} />
  )
);
H2.displayName = 'H2';

const H3 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h3" className={className} as="h3" {...props} />
  )
);
H3.displayName = 'H3';

const H4 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h4" className={className} as="h4" {...props} />
  )
);
H4.displayName = 'H4';

const H5 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h5" className={className} as="h5" {...props} />
  )
);
H5.displayName = 'H5';

const H6 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h6" className={className} as="h6" {...props} />
  )
);
H6.displayName = 'H6';

const P = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="p" className={className} as="p" {...props} />
  )
);
P.displayName = 'P';

const Blockquote = React.forwardRef<HTMLQuoteElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="blockquote" className={className} as="blockquote" {...props} />
  )
);
Blockquote.displayName = 'Blockquote';

const Code = React.forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="code" className={className} as="code" {...props} />
  )
);
Code.displayName = 'Code';

const Lead = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="lead" className={className} as="p" {...props} />
  )
);
Lead.displayName = 'Lead';

const Large = React.forwardRef<HTMLDivElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="large" className={className} as="div" {...props} />
  )
);
Large.displayName = 'Large';

const Small = React.forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="small" className={className} as="small" {...props} />
  )
);
Small.displayName = 'Small';

const Muted = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="muted" className={className} as="p" {...props} />
  )
);
Muted.displayName = 'Muted';

export {
  Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Blockquote,
  Code,
  Lead,
  Large,
  Small,
  Muted,
  typographyVariants,
}; 