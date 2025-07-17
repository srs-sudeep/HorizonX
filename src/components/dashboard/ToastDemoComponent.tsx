import React, { useState } from 'react';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast';

const ToastDemoComponent: React.FC = () => {
  const [toasts, setToasts] = useState<any[]>([]);
  const showToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [
      ...prev,
      { id, type, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`, description: `This is a ${type} toast!`, progress: 100 }
    ]);
    // Animate progress bar
    let progress = 100;
    const interval = setInterval(() => {
      progress -= 2;
      setToasts((prev) => prev.map(t => t.id === id ? { ...t, progress } : t));
      if (progress <= 0) {
        clearInterval(interval);
        setToasts((prev) => prev.filter(t => t.id !== id));
      }
    }, 30);
  };
  return (
    <ToastProvider>
      <div className="flex flex-col gap-4 items-center justify-center p-8">
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition" onClick={() => showToast('success')}>Show Success Toast</button>
          <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition" onClick={() => showToast('error')}>Show Error Toast</button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition" onClick={() => showToast('info')}>Show Info Toast</button>
          <button className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition" onClick={() => showToast('warning')}>Show Warning Toast</button>
        </div>
        <ToastViewport />
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} progress={toast.progress}>
            <div className="flex flex-col gap-1">
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastDescription>{toast.description}</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        ))}
      </div>
    </ToastProvider>
  );
};

export default ToastDemoComponent; 