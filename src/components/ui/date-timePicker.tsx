'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  Button,
  ScrollArea,
  ScrollBar,
} from '@/components';

type Props = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

export function DateTimePicker({ value, onChange }: Props) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setInternalDate(value);
  }, [value]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const updated = new Date(selectedDate);
      if (internalDate) {
        updated.setHours(internalDate.getHours());
        updated.setMinutes(internalDate.getMinutes());
      }
      setInternalDate(updated);
      onChange?.(updated);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', valueStr: string) => {
    if (!internalDate) return;

    const updated = new Date(internalDate);
    const hour = updated.getHours();
    if (type === 'hour') {
      const val = parseInt(valueStr);
      const isPM = hour >= 12;
      updated.setHours((val % 12) + (isPM ? 12 : 0));
    } else if (type === 'minute') {
      updated.setMinutes(parseInt(valueStr));
    } else if (type === 'ampm') {
      const isCurrentlyPM = hour >= 12;
      if (valueStr === 'AM' && isCurrentlyPM) {
        updated.setHours(hour - 12);
      } else if (valueStr === 'PM' && !isCurrentlyPM) {
        updated.setHours(hour + 12);
      }
    }

    setInternalDate(updated);
    onChange?.(updated);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !internalDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {internalDate ? (
            format(internalDate, 'MM/dd/yyyy hh:mm aa')
          ) : (
            <span>MM/DD/YYYY hh:mm aa</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.reverse().map(hour => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      internalDate && internalDate.getHours() % 12 === hour % 12
                        ? 'default'
                        : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map(minute => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      internalDate && internalDate.getMinutes() === minute ? 'default' : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange('minute', minute.toString())}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea>
              <div className="flex sm:flex-col p-2">
                {['AM', 'PM'].map(ampm => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      internalDate &&
                      ((ampm === 'AM' && internalDate.getHours() < 12) ||
                        (ampm === 'PM' && internalDate.getHours() >= 12))
                        ? 'default'
                        : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange('ampm', ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
