import { SocketRepository } from "../../../repositories/SocketRepository";

export class CreateRoomUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  execute() {
    this.socketServer.emit("createRoom");
  };
}