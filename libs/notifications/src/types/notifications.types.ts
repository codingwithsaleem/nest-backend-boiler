export interface SseMessageEvent<T = string | object> {
  data: T;
  id?: string;
  type?: string;
  retry?: number;
}
