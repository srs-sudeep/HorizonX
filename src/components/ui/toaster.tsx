import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components';
import { useTypographyStore, FONT_FAMILIES } from '@/store';

export function Toaster() {
  const { toasts } = useToast();
  const { fontFamily } = useTypographyStore();
  const selectedFont = FONT_FAMILIES.find(font => font.value === fontFamily)?.class || 'font-inter';

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle className={selectedFont}>{title}</ToastTitle>}
              {description && <ToastDescription className={selectedFont}>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
