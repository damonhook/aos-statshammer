export type NotificationVariant = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  message: string
  details?: string
  variant?: NotificationVariant
}

interface NotificationsStore {
  items: Notification[]
}

export default NotificationsStore
