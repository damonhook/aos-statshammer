export interface INotification {
  message: string;
  key: string;
  variant: 'info' | 'warning' | 'error' | 'success';
}
