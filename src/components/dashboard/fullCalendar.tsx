import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const events = [
  { title: 'Event 1', date: '2024-07-15' },
  { title: 'Event 2', date: '2024-07-18' },
];

const FullCalendarComponent = () => {
  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
  };

  return (
    <div style={{ height: 400 }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height={400}
      />
    </div>
  );
};

export default FullCalendarComponent; 