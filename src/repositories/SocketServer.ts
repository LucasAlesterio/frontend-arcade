import io, { Socket } from 'socket.io-client';
import { SocketRepository } from './SocketRepository';

export class SocketServer implements SocketRepository {
  private socket: Socket;

  constructor() {
    this.socket = io(import.meta.env.VITE_URL_SOCKET);
  }

  public getId() {
    return this.socket.id || '';
  }

  get connected() {
    return this.socket.connected;
  }


  public on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void) {
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.removeAllListeners(event);
    }
  }

  public emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args);
  }

  public offAny() {
    this.socket.offAny();
  }

  public removeAllListeners(event: string) {
    this.socket.removeAllListeners(event);
  }
}

