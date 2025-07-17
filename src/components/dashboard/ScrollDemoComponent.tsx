import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const ScrollDemoComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Vertical Scroll Demo */}
      <div>
        <div className="font-semibold mb-2">Vertical Scroll</div>
        <ScrollArea className="h-32 w-full rounded border">
          <div className="space-y-2 p-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="bg-blue-100 dark:bg-blue-900 rounded px-3 py-2">
                Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      {/* Horizontal Scroll Demo */}
      <div>
        <div className="font-semibold mb-2">Horizontal Scroll</div>
        <ScrollArea className="w-full rounded border" style={{ height: 60 }}>
          <div className="flex gap-2 p-2 min-w-max">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="bg-green-100 dark:bg-green-900 rounded px-6 py-2 min-w-[80px] text-center">
                Col {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ScrollDemoComponent; 