import { useLocation } from 'react-router-dom';

const ChatsPage = () => {
  const location = useLocation();

  // Extract the page title from the route path
  const getPageTitle = () => {
    const path = location.pathname;

    // Split the path and get the last segment
    const pathSegments = path.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Capitalize the first letter and replace hyphens with spaces
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  };

  // Get module name from the second segment of the path
  const getModuleName = () => {
    const path = location.pathname;
    const pathSegments = path.split('/');

    if (pathSegments.length >= 2) {
      const moduleName = pathSegments[1];
      return moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    }

    return 'Module';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
        <p className="text-muted-foreground">{getModuleName()} Module</p>
      </div>

      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Page Content</h2>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg bg-background/50">
            <p className="font-medium">This is a placeholder for the {getPageTitle()} page</p>
            <p className="text-muted-foreground mt-2">
              The {getModuleName()} module's content would appear here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="p-4 border rounded-lg bg-background flex flex-col">
                <div className="h-2 w-20 bg-muted rounded mb-2"></div>
                <div className="h-4 w-36 bg-muted rounded mb-4"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-full bg-muted rounded"></div>
                  <div className="h-2 w-full bg-muted rounded"></div>
                  <div className="h-2 w-2/3 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
