import { SocketRepository } from "../../repositories/SocketRepository";

export class RemovePlayerUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  execute() {
    this.socketServer.emit("removePlayer");
  };
}