export type MessageSeverity = 'success' | 'info' | 'warning' | 'error';

export type Message = {
  severity: MessageSeverity;
  text: string;
}
