/* import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DynamicForm } from '../DynamicForm';

const isDarkMode = () => {
  if (typeof document !== 'undefined') {
    return document.body.classList.contains('dark');
  }
  return false;
};

// Modal using DynamicForm
const Modal = ({ isOpen, onClose, onSave, eventData, onDelete }: any) => {
  if (!isOpen) return null;
  const dark = isDarkMode();

  // Schema for DynamicForm
  const schema = [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      placeholder: 'Event Title',
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      required: false,
      placeholder: 'Event Description',
    },
    {
      type: 'text',
      name: 'location',
      label: 'Location',
      required: false,
      placeholder: 'Event Location',
    },
    {
      type: 'color',
      name: 'color',
      label: 'Event Color',
      required: true,
      defaultValue: '#3788d8',
    },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: dark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: dark ? '#1e293b' : '#eaf3fb', color: dark ? '#f3f3f3' : '#222', padding: 32, borderRadius: 24, minWidth: 340, boxShadow: dark ? '0 4px 32px #0008' : '0 4px 32px #0002', border: dark ? '1px solid #334155' : '1px solid #b6d4f7', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center', letterSpacing: '-0.5px' }}>{eventData.id ? 'Edit Event' : 'Add Event'}</h3>
        <DynamicForm
          schema={schema}
          defaultValues={eventData}
          onSubmit={onSave}
          submitButtonText={eventData.id ? 'Update' : 'Add'}
          onCancel={onClose}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          {eventData.id && (
            <button onClick={onDelete} style={{
              padding: '10px 22px',
              borderRadius: '999px',
              background: '#fee2e2',
              color: '#b91c1c',
              fontWeight: 600,
              border: 'none',
              boxShadow: '0 1px 4px #0001',
              transition: 'background 0.2s',
              marginRight: 8,
              cursor: 'pointer',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#fecaca')}
            onMouseOut={e => (e.currentTarget.style.background = '#fee2e2')}
            >Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

const FullCalendarComponent = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Event 1', start: '2024-07-15T10:00:00', end: '2024-07-15T11:00:00', description: 'First event', location: '', color: '#3788d8' },
    { id: '2', title: 'Event 2', start: '2024-07-18T14:00:00', end: '2024-07-18T15:00:00', description: 'Second event', location: '', color: '#e67e22' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventData, setEventData] = useState({ id: '', title: '', start: '', end: '', description: '', location: '', color: '#3788d8' });

  // Add new event by clicking a date
  const handleDateClick = (arg: any) => {
    setEventData({ id: '', title: '', start: arg.dateStr, end: '', description: '', location: '', color: '#3788d8' });
    setModalOpen(true);
  };

  // Add new event by selecting a time range
  const handleSelect = (info: any) => {
    setEventData({ id: '', title: '', start: info.startStr, end: info.endStr, description: '', location: '', color: '#3788d8' });
    setModalOpen(true);
  };

  // Edit event
  const handleEventClick = (clickInfo: any) => {
    const evt = events.find(e => e.id === clickInfo.event.id);
    if (evt) {
      setEventData({ ...evt, location: evt.location || '', start: evt.start, end: evt.end });
      setModalOpen(true);
    }
  };

  // Save event (add or update)
  const handleSave = (formValues: any) => {
    const newEvent = { ...eventData, ...formValues };
    if (newEvent.id) {
      setEvents(evts => evts.map(e => e.id === newEvent.id ? { ...newEvent } : e));
    } else {
      setEvents(evts => [
        ...evts,
        { ...newEvent, id: Date.now().toString() },
      ]);
    }
    setModalOpen(false);
  };

  // Delete event
  const handleDelete = () => {
    setEvents(evts => evts.filter(e => e.id !== eventData.id));
    setModalOpen(false);
  };

  // Custom event rendering with color, description, and location
  const renderEventContent = (eventInfo: any) => {
    const dark = isDarkMode();
    return (
      <div style={{ background: eventInfo.event.extendedProps.color, color: dark ? '#fff' : '#fff', borderRadius: 4, padding: 2, boxShadow: dark ? '0 1px 4px #0008' : '0 1px 4px #0002', border: dark ? '1px solid #222' : 'none' }}>
        <b>{eventInfo.event.title}</b>
        {eventInfo.event.extendedProps.description && (
          <div style={{ fontSize: 10 }}>{eventInfo.event.extendedProps.description}</div>
        )}
        {eventInfo.event.extendedProps.location && (
          <div style={{ fontSize: 10, fontStyle: 'italic' }}>@ {eventInfo.event.extendedProps.location}</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ height: 600, width: '100%', maxWidth: 900, margin: '0 auto', background: 'var(--fc-bg, #fff)', borderRadius: 16, boxShadow: '0 4px 32px #0001', padding: 24 }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events.map(e => ({
          ...e,
          backgroundColor: e.color,
          borderColor: e.color,
          title: e.title,
          description: e.description,
          location: e.location,
          start: e.start,
          end: e.end,
          extendedProps: {
            description: e.description,
            location: e.location,
            color: e.color
          }
        }))}
        dateClick={handleDateClick}
        select={handleSelect}
        selectable={true}
        editable={true}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        height={600}
        nowIndicator={true}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        eventDrop={(info) => {
          setEvents(evts => evts.map(e =>
            e.id === info.event.id
              ? { ...e, start: info.event.startStr, end: info.event.endStr }
              : e
          ));
        }}
        eventResize={(info) => {
          setEvents(evts => evts.map(e =>
            e.id === info.event.id
              ? { ...e, start: info.event.startStr, end: info.event.endStr }
              : e
          ));
        }}
        dayMaxEvents={3}
        eventMouseEnter={(info) => {
          let tooltip = '';
          if (info.event.title) tooltip += info.event.title + '\n';
          if (info.event.extendedProps.description) tooltip += info.event.extendedProps.description + '\n';
          if (info.event.extendedProps.location) tooltip += '@ ' + info.event.extendedProps.location;
          info.el.setAttribute('title', tooltip.trim());
        }}
        eventMouseLeave={(info) => {
          info.el.removeAttribute('title');
        }}
        selectMirror={true}
        longPressDelay={100}
        eventLongPressDelay={100}
        eventDurationEditable={true}
        eventStartEditable={true}
      />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        eventData={eventData}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FullCalendarComponent; */