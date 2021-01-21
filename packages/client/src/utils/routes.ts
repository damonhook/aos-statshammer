// === Pages ===

export const PAGE_ROUTES = {
  HOME: '/',
  TARGET: '/target',
  STATS: '/stats',
  SIMULATIONS: '/simulations',
  EXPORT: '/export',
  ABOUT: '/about',
} as const

type PageRouteKeys = keyof typeof PAGE_ROUTES
export type PageRoute = typeof PAGE_ROUTES[PageRouteKeys]

// === Dialogs ===

export const DIALOG_ROUTES = {
  EDIT_UNIT: '/units/:unitId',
  EDIT_PROFILE: '/units/:unitId/profile/:id',
} as const

type DialogRouteKeys = keyof typeof DIALOG_ROUTES
export type DialogRoute = typeof DIALOG_ROUTES[DialogRouteKeys]

export const getDialogRoute = (path: DialogRoute, params: { [name: string]: string }) =>
  Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path)

// === Hashes ===

export const HASH_ROUTES = {
  MODIFIERS: '#modifiers',
  TARGET_MODIFIERS: '#target-modifiers',
} as const

type HashRouteKeys = keyof typeof HASH_ROUTES
export type HashRoute = typeof HASH_ROUTES[HashRouteKeys]

// === External Links ===

export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/damonhook/aos-statshammer',
  RELEASES: 'https://github.com/damonhook/aos-statshammer/releases',
  REDDIT: 'https://www.reddit.com/r/AoSStatshammer',
  WARCRY_STATSHAMMER: 'https://warcry-statshammer.herokuapp.com',
} as const

type ExternalLinkKeys = keyof typeof EXTERNAL_LINKS
export type ExternalLink = typeof EXTERNAL_LINKS[ExternalLinkKeys]
