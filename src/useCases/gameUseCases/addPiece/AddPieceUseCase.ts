import { SocketRepository } from "../../../repositories/SocketRepository";

export class AddPieceUseCase {
  private socketServer: SocketRepository;

  constructor(socketServer: SocketRepository) {
    this.socketServer = socketServer;
  }

  execute(row: number) {
    this.socketServer.emit("addPiece", row);
  };
}