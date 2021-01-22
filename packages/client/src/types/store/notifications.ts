export type NotificationVariant = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  title?: string
  message: string
  variant?: NotificationVariant
}

interface NotificationsStore {
  items: Notification[]
}

export default NotificationsStore
