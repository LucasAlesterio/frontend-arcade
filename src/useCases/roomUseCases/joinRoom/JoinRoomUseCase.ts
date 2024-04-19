import { SocketRepository } from "../../../repositories/SocketRepository";

export class JoinRoomUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  execute(roomId: string) {
    this.socketServer.emit("joinRoom", roomId);
  };
}