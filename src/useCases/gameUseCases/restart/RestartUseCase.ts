import { SocketRepository } from "../../../repositories/SocketRepository";

export class RestartUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  execute() {
    this.socketServer.emit("restart");
  };
}