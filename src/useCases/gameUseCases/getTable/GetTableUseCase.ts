import { SocketRepository } from "../../../repositories/SocketRepository";

export class GetTableUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  execute() {
    this.socketServer.emit("getTable");
  };
}