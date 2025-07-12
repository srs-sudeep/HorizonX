import { RouteObject } from 'react-router-dom';

export function filterNestedRoutesByAvailable(
  allRoutes: RouteObject[],
  availablePaths: string[],
  parentPath = ''
): RouteObject[] {
  return allRoutes.reduce<RouteObject[]>((acc, route) => {
    const currentPath = [parentPath, route.path].filter(Boolean).join('/').replace(/\/+/g, '/');
    let filteredRoute: RouteObject | null = null;
    let filteredChildren: RouteObject[] = [];
    if (route.children && route.children.length > 0) {
      filteredChildren = filterNestedRoutesByAvailable(route.children, availablePaths, currentPath);
      if (filteredChildren.length > 0) {
        filteredRoute = { ...route, children: filteredChildren };
      }
    }
    if (
      (!route.children || route.children.length === 0) &&
      route.path &&
      availablePaths.includes(`/${currentPath}`.replace(/\/+/g, '/'))
    ) {
      filteredRoute = { ...route };
    }
    if (
      route.children &&
      route.children.some(
        child =>
          child.index === true && availablePaths.includes(`/${currentPath}`.replace(/\/+/g, '/'))
      )
    ) {
      filteredRoute = { ...route, children: filteredChildren };
    }

    if (filteredRoute) {
      acc.push(filteredRoute);
    }

    return acc;
  }, []);
}
