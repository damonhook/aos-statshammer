export type TNotificationVariants = 'info' | 'warning' | 'error' | 'success';

export interface INotificationAction {
  label: string;
  onClick: () => void;
}

export interface INotificationParameters {
  message: string;
  key?: string;
  variant?: TNotificationVariants;
  action?: INotificationAction;
}

export interface INotification extends INotificationParameters {
  key: string;
  variant: TNotificationVariants;
}
