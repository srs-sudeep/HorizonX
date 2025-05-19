import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export function LoadingSpinner({
  size = 'md',
  className,
  text,
  variant = 'default',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const variantClasses = {
    default: 'text-muted-foreground',
    primary: 'text-blue-500',
    secondary: 'text-blue-600',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className={cn('animate-spin', sizeClasses[size], variantClasses[variant], className)}>
        <Loader2 className="h-full w-full" />
      </div>
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="rounded-lg bg-background p-8 shadow-lg border border-blue-100 dark:border-blue-900/30">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
            <LoadingSpinner size="lg" variant="primary" className="opacity-75" />
          </div>
          <p className="mt-4 text-sm text-blue-600 font-medium">Loading...</p>
          <div className="mt-2 flex space-x-1.5">
            <div
              className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
