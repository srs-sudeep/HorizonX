import * as React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger, Button } from '@/components';

interface TimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [internalTime, setInternalTime] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setInternalTime(value);
  }, [value]);

  // Generate hours and minutes
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const getHour = () => {
    if (!internalTime) return '';
    let h = internalTime.getHours();
    if (h === 0) return 12;
    if (h > 12) return h - 12;
    return h;
  };
  const getMinute = () => (internalTime ? internalTime.getMinutes() : 0);
  const getAMPM = () => (internalTime ? (internalTime.getHours() >= 12 ? 'PM' : 'AM') : 'AM');

  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', valueStr: string) => {
    let date = internalTime ? new Date(internalTime) : new Date();
    if (type === 'hour') {
      let hour = parseInt(valueStr, 10);
      if (getAMPM() === 'PM' && hour !== 12) hour += 12;
      if (getAMPM() === 'AM' && hour === 12) hour = 0;
      date.setHours(hour);
    } else if (type === 'minute') {
      date.setMinutes(parseInt(valueStr, 10));
    } else if (type === 'ampm') {
      let hour = date.getHours();
      if (valueStr === 'AM' && hour >= 12) hour -= 12;
      if (valueStr === 'PM' && hour < 12) hour += 12;
      date.setHours(hour);
    }
    setInternalTime(date);
    onChange?.(date);
  };

  const formatTime = () => {
    if (!internalTime) return 'Select time';
    let h = getHour();
    let m = getMinute();
    let ampm = getAMPM();
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !internalTime && 'text-muted-foreground'
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {formatTime()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex gap-4 items-center justify-center">
          {/* Hour Dropdown */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-xs text-muted-foreground">Hour</span>
            <select
              className="border rounded px-2 py-1 focus:outline-none"
              value={(() => {
                if (!internalTime) return 12;
                let h = internalTime.getHours() % 12;
                return h === 0 ? 12 : h;
              })()}
              onChange={e => handleTimeChange('hour', e.target.value)}
            >
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>
          {/* Minute Dropdown */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-xs text-muted-foreground">Minute</span>
            <select
              className="border rounded px-2 py-1 focus:outline-none"
              value={internalTime ? internalTime.getMinutes() : 0}
              onChange={e => handleTimeChange('minute', e.target.value)}
            >
              {minutes.map(minute => (
                <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
          {/* AM/PM Dropdown */}
          <div className="flex flex-col items-center">
            <span className="mb-2 text-xs text-muted-foreground">AM/PM</span>
            <select
              className="border rounded px-2 py-1 focus:outline-none"
              value={internalTime ? (internalTime.getHours() >= 12 ? 'PM' : 'AM') : 'AM'}
              onChange={e => handleTimeChange('ampm', e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 