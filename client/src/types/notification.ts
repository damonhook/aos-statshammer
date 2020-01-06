export type TNotificationVariants = 'info' | 'warning' | 'error' | 'success';

export interface INotificationParameters {
  message: string;
  key?: string;
  variant?: TNotificationVariants;
}

export interface INotification extends INotificationParameters {
  key: string;
}
