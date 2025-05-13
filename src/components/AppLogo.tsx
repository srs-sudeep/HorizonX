
import { cn } from '@/lib/utils';

interface AppLogoProps {
  className?: string;
  collapsed?: boolean;
}

const AppLogo = ({ className, collapsed = false }: AppLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
        <span className="text-white font-bold text-lg">C</span>
      </div>
      {!collapsed && (
        <div className="font-bold text-lg">Codename</div>
      )}
    </div>
  );
};

export default AppLogo;
