export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  href?: string;
  date: string;
}
