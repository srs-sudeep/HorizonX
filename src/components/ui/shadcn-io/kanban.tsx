import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import type { DragEndEvent } from '@/components/ui/shadcn-io/kanban';
import { useState } from 'react';
import { addMonths, endOfMonth, startOfMonth, subDays, subMonths } from 'date-fns';

// Inline content
const today = new Date();

const exampleStatuses = [
  { id: '1', name: 'Planned', color: '#6B7280' },
  { id: '2', name: 'In Progress', color: '#F59E0B' }, 
  { id: '3', name: 'Done', color: '#10B981' },
];

const initialFeatures = [
  {
    id: '1',
    name: 'AI Scene Analysis',
    startAt: startOfMonth(subMonths(today, 6)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[0],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '1',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=1',
      name: 'Alice Johnson',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '1', name: 'v1.0' },
  },
  {
    id: '2',
    name: 'Collaborative Editing',
    startAt: startOfMonth(subMonths(today, 5)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[1],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '2',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=2',
      name: 'Bob Smith',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '1', name: 'v1.0' },
  },
  {
    id: '3',
    name: 'AI-Powered Color Grading',
    startAt: startOfMonth(subMonths(today, 4)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[2],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '3',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=3',
      name: 'Charlie Brown',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '2', name: 'v1.1' },
  },
  {
    id: '4',
    name: 'Real-time Video Chat',
    startAt: startOfMonth(subMonths(today, 3)),
    endAt: subDays(endOfMonth(today), 12),
    status: exampleStatuses[0],
    group: { id: '2', name: 'Collaboration Tools' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '4',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=4',
      name: 'Diana Prince',
    },
    initiative: { id: '2', name: 'Real-time Collaboration' },
    release: { id: '2', name: 'v1.1' },
  },
  {
    id: '5',
    name: 'AI Voice-to-Text Subtitles',
    startAt: startOfMonth(subMonths(today, 2)),
    endAt: subDays(endOfMonth(today), 5),
    status: exampleStatuses[1],
    group: { id: '1', name: 'Core AI Features' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '5',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=5',
      name: 'Ethan Hunt',
    },
    initiative: { id: '1', name: 'AI Integration' },
    release: { id: '2', name: 'v1.1' },
  },
  {
    id: '6',
    name: 'Cloud Asset Management',
    startAt: startOfMonth(subMonths(today, 1)),
    endAt: endOfMonth(today),
    status: exampleStatuses[2],
    group: { id: '3', name: 'Cloud Infrastructure' },
    product: { id: '1', name: 'Video Editor Pro' },
    owner: {
      id: '6',
      image: 'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=6',
      name: 'Fiona Gallagher',
    },
    initiative: { id: '3', name: 'Cloud Migration' },
    release: { id: '3', name: 'v1.2' },
  },
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
});

const Example = () => {
  const [features, setFeatures] = useState(initialFeatures);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const status = exampleStatuses.find((status) => status.name === over.id);

    if (!status) {
      return;
    }

    setFeatures(
      features.map((feature) => {
        if (feature.id === active.id) {
          return { ...feature, status };
        }

        return feature;
      })
    );
  };

  return (
    <KanbanProvider onDragEnd={handleDragEnd} className="p-4">
      {exampleStatuses.map((status) => (
        <KanbanBoard key={status.name} id={status.name}>
          <KanbanHeader name={status.name} color={status.color} />
          <KanbanCards>
            {features
              .filter((feature) => feature.status.name === status.name)
              .map((feature, index) => (
                <KanbanCard
                  key={feature.id}
                  id={feature.id}
                  name={feature.name}
                  parent={status.name}
                  index={index}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <p className="m-0 flex-1 font-medium text-sm">
                        {feature.name}
                      </p>
                      <p className="m-0 text-muted-foreground text-xs">
                        {feature.initiative.name}
                      </p>
                    </div>
                    {feature.owner && (
                      <Avatar className="h-4 w-4 shrink-0">
                        <AvatarImage src={feature.owner.image} />
                        <AvatarFallback>
                          {feature.owner.name?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <p className="m-0 text-muted-foreground text-xs">
                    {shortDateFormatter.format(feature.startAt)} -{' '}
                    {dateFormatter.format(feature.endAt)}
                  </p>
                </KanbanCard>
              ))}
          </KanbanCards>
        </KanbanBoard>
      ))}
    </KanbanProvider>
  );
};

export default Example;