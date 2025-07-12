import { Avatar, AvatarFallback, AvatarImage } from '@/components';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  role?: string;
  imgUrl?: string;
  className?: string;
  showInfo?: boolean;
}

export const UserAvatar = ({ name, role, imgUrl, className, showInfo = true }: UserAvatarProps) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar>
        <AvatarImage src={imgUrl} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {showInfo && (
        <div className="hidden md:block">
          <p className="text-sm font-medium">{name}</p>
          {role && <p className="text-xs text-muted-foreground">{role}</p>}
        </div>
      )}
    </div>
  );
};
