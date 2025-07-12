'use client';

import * as React from 'react';
import { ClockIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  ScrollArea,
  Separator,
} from '@/components';

type TimeRange = {
  start?: Date;
  end?: Date;
};

type Props = {
  value?: TimeRange;
  onChange?: (timeRange: TimeRange) => void;
  placeholder?: string;
};

export function TimeRangePicker({ value, onChange, placeholder = 'Select time range' }: Props) {
  const [internalRange, setInternalRange] = React.useState<TimeRange>(value || {});
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSelection, setActiveSelection] = React.useState<'start' | 'end'>('start');

  // Refs for scroll areas
  const hourRef = React.useRef<HTMLDivElement>(null);
  const minuteRef = React.useRef<HTMLDivElement>(null);
  const ampmRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setInternalRange(value || {});
  }, [value]);

  // Scroll selected value into view when opening or changing selection
  React.useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      const currentTime = activeSelection === 'start' ? internalRange.start : internalRange.end;
      if (!currentTime) return;

      // Scroll hour
      if (hourRef.current) {
        const hour = currentTime.getHours() % 12 || 12;
        const hourBtn = hourRef.current.querySelector<HTMLButtonElement>(`[data-hour="${hour}"]`);
        hourBtn?.scrollIntoView({ block: 'center' });
      }
      // Scroll minute
      if (minuteRef.current) {
        const minute = currentTime.getMinutes();
        const minuteBtn = minuteRef.current.querySelector<HTMLButtonElement>(
          `[data-minute="${minute}"]`
        );
        minuteBtn?.scrollIntoView({ block: 'center' });
      }
      // Scroll AM/PM
      if (ampmRef.current) {
        const isPM = currentTime.getHours() >= 12;
        const ampmBtn = ampmRef.current.querySelector<HTMLButtonElement>(
          `[data-ampm="${isPM ? 'PM' : 'AM'}"]`
        );
        ampmBtn?.scrollIntoView({ block: 'center' });
      }
    }, 0);
  }, [isOpen, activeSelection, internalRange, value]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const createTimeFromComponents = (hour: number, minute: number, isPM: boolean) => {
    const date = new Date();
    date.setHours((hour % 12) + (isPM ? 12 : 0));
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', valueStr: string) => {
    const currentTime = activeSelection === 'start' ? internalRange.start : internalRange.end;

    if (!currentTime) {
      // Create a new time starting from 12:00 AM
      const newTime = createTimeFromComponents(12, 0, false);
      const updated = { ...internalRange };
      updated[activeSelection] = newTime;
      setInternalRange(updated);
      onChange?.(updated);
      return;
    }

    const updatedTime = new Date(currentTime);
    const currentHour = updatedTime.getHours();

    if (type === 'hour') {
      const val = parseInt(valueStr);
      const isPM = currentHour >= 12;
      updatedTime.setHours((val % 12) + (isPM ? 12 : 0));
    } else if (type === 'minute') {
      updatedTime.setMinutes(parseInt(valueStr));
    } else if (type === 'ampm') {
      const isCurrentlyPM = currentHour >= 12;
      if (valueStr === 'AM' && isCurrentlyPM) {
        updatedTime.setHours(currentHour - 12);
      } else if (valueStr === 'PM' && !isCurrentlyPM) {
        updatedTime.setHours(currentHour + 12);
      }
    }

    const updated = { ...internalRange };
    updated[activeSelection] = updatedTime;
    setInternalRange(updated);
    onChange?.(updated);
  };

  const formatTime = (date: Date | undefined) => {
    return date ? format(date, 'hh:mm aa') : '--:-- --';
  };

  const getDisplayText = () => {
    if (!internalRange.start && !internalRange.end) {
      return placeholder;
    }
    return `${formatTime(internalRange.start)} - ${formatTime(internalRange.end)}`;
  };

  const isActive = (type: 'hour' | 'minute' | 'ampm', value: number | string) => {
    const currentTime = activeSelection === 'start' ? internalRange.start : internalRange.end;
    if (!currentTime) return false;

    if (type === 'hour') {
      return currentTime.getHours() % 12 === (value as number) % 12;
    } else if (type === 'minute') {
      return currentTime.getMinutes() === value;
    } else if (type === 'ampm') {
      const isPM = currentTime.getHours() >= 12;
      return (value === 'PM' && isPM) || (value === 'AM' && !isPM);
    }
    return false;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <ClockIcon className="mr-2 h-4 w-4" />
          <span
            className={!internalRange.start && !internalRange.end ? 'text-muted-foreground' : ''}
          >
            {getDisplayText()}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-4">
          {/* Time Selection Tabs */}
          <div className="flex mb-4 space-x-2">
            <Button
              variant={activeSelection === 'start' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSelection('start')}
              className="flex-1"
            >
              Start: {formatTime(internalRange.start)}
            </Button>
            <Button
              variant={activeSelection === 'end' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSelection('end')}
              className="flex-1"
            >
              End: {formatTime(internalRange.end)}
            </Button>
          </div>

          <Separator className="mb-4" />

          {/* Time Pickers */}
          <div className="flex divide-x">
            {/* Hours */}
            <ScrollArea className="w-20 h-[200px]" ref={hourRef}>
              <div className="flex flex-col p-2">
                {hours.map(hour => (
                  <Button
                    key={hour}
                    size="sm"
                    variant={isActive('hour', hour) ? 'default' : 'ghost'}
                    className="w-full mb-1"
                    onClick={() => handleTimeChange('hour', hour.toString())}
                    data-hour={hour}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {/* Minutes */}
            <ScrollArea className="w-20 h-[200px]" ref={minuteRef}>
              <div className="flex flex-col p-2">
                {minutes.map(minute => (
                  <Button
                    key={minute}
                    size="sm"
                    variant={isActive('minute', minute) ? 'default' : 'ghost'}
                    className="w-full mb-1"
                    onClick={() => handleTimeChange('minute', minute.toString())}
                    data-minute={minute}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {/* AM/PM */}
            <ScrollArea className="w-20 h-[200px]" ref={ampmRef}>
              <div className="flex flex-col p-2">
                {['AM', 'PM'].map(ampm => (
                  <Button
                    key={ampm}
                    size="sm"
                    variant={isActive('ampm', ampm) ? 'default' : 'ghost'}
                    className="w-full mb-1"
                    onClick={() => handleTimeChange('ampm', ampm)}
                    data-ampm={ampm}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-between mt-4 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = { start: undefined, end: undefined };
                setInternalRange(updated);
                onChange?.(updated);
              }}
            >
              Clear
            </Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
