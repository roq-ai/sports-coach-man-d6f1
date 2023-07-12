const mapping: Record<string, string> = {
  athletes: 'athlete',
  clubs: 'club',
  coaches: 'coach',
  'training-days': 'training_day',
  'training-groups': 'training_group',
  users: 'user',
  venues: 'venue',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
