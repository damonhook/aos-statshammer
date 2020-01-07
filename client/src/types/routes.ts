export enum EPages {
  HOME = 'Home',
  SIMULATIONS = 'Simulations',
}

export const Routes: ReadonlyMap<EPages, string> = new Map([
  [EPages.HOME, '/'],
  [EPages.SIMULATIONS, '/simulations'],
]);

export const getRoute = (page: EPages): string => Routes.get(page) ?? (getRoute(EPages.HOME) as string);
