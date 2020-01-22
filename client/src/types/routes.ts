export enum EPages {
  HOME = 'Home',
  SIMULATIONS = 'Simulations',
  PDF = 'PDF',
  ABOUT = 'About',
}

export const Routes: ReadonlyMap<EPages, string> = new Map([
  [EPages.HOME, '/'],
  [EPages.SIMULATIONS, '/simulations'],
  [EPages.PDF, '/pdf'],
  [EPages.ABOUT, '/about'],
]);

export const getRoute = (page: EPages): string => Routes.get(page) ?? (getRoute(EPages.HOME) as string);
