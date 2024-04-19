import { SocketRepository } from "../../repositories/SocketRepository";

export class CreatePlayerUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  execute(name: string) {
    this.socketServer.emit("createPlayer", name);
  };
}