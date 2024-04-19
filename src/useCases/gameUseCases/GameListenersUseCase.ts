import { Player } from "../../entities/Player";
import { Table } from "../../entities/Table";
import { SocketRepository } from "../../repositories/SocketRepository";

export class GameListenersUseCase {
  private socketServer: SocketRepository;
  private onTableCallback?: (value: Table) => void;
  private onYouWimCallback?: () => void;
  private onYouLoseCallback?: () => void;
  private onDisconnectCallback?: () => void;
  private onErrorCallback?: (message: string) => void;
  private onPlayerJoinedCallback?: (player: Player) => void;
  private onYouJoinedCallback?: () => void;
  private onRoomCreatedCallback?: (id: string) => void;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  setOnTableCallback(callback: (value: Table) => void) {
    this.onTableCallback = callback;
    this.socketServer.removeAllListeners('table');
    this.socketServer.on('table', this.onTableCallback);
  }

  setOnYouWimCallback(callback: () => void) {
    this.onYouWimCallback = callback;
    this.socketServer.removeAllListeners('winner');
    this.socketServer.on('winner', (player: Player) => {
      if (player.Id === this.socketServer.getId()) {
        this.onYouWimCallback?.();
      } else {
        this.onYouLoseCallback?.();
      }
    });
  }

  setOnYouLoseCallback(callback: () => void) {
    this.onYouLoseCallback = callback;
    this.socketServer.removeAllListeners('winner');
    this.socketServer.on('winner', (player: Player) => {
      if (player.Id === this.socketServer.getId()) {
        this.onYouWimCallback?.();
      } else {
        this.onYouLoseCallback?.();
      }
    });
  }

  setOnErrorCallback(callback: (message: string) => void) {
    this.onErrorCallback = callback;
    this.socketServer.removeAllListeners('error');
    this.socketServer.on('error', this.onErrorCallback);
  }

  setOnPlayerJoinedCallback(callback: (player: Player) => void) {
    this.onPlayerJoinedCallback = callback;
    this.socketServer.removeAllListeners('playerJoined');
    this.socketServer.on('playerJoined', (player: Player) => {
      if (player.Id === this.socketServer.getId()) {
        this.onYouJoinedCallback?.();
      } else {
        this.onPlayerJoinedCallback?.(player);
      }
    });
  }

  setOnYouJoinedCallback(callback: () => void) {
    this.onYouJoinedCallback = callback;
    this.socketServer.removeAllListeners('playerJoined');
    this.socketServer.on('playerJoined', (player: Player) => {
      if (player.Id === this.socketServer.getId()) {
        this.onYouJoinedCallback?.();
      } else {
        this.onPlayerJoinedCallback?.(player);
      }
    });
  }

  setOnDisconnectCallback(callback: () => void) {
    this.onDisconnectCallback = callback;
    this.socketServer.removeAllListeners('disconnect');
    this.socketServer.on('disconnect', this.onDisconnectCallback);
  }

  setOnRoomCreatedCallback(callback: (id: string) => void) {
    this.onRoomCreatedCallback = callback;
    this.socketServer.removeAllListeners('roomCreated');
    this.socketServer.on('roomCreated', this.onRoomCreatedCallback);
  }


  off() {
    this.socketServer.removeAllListeners('playerJoined');
    this.socketServer.removeAllListeners('error');
    this.socketServer.removeAllListeners('winner');
    this.socketServer.removeAllListeners('table');
    this.socketServer.removeAllListeners('disconnect');
    this.socketServer.removeAllListeners('roomCreated');
    this.socketServer.offAny();
  }
}