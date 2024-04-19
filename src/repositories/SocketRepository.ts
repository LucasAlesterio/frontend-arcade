export interface SocketRepository {
  getId: () => string;
  connected: boolean;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback?: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => void;
  offAny: () => void;
  removeAllListeners: (event: string) => void;
}