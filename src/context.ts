import { createContext } from "react";
import { SocketRepository } from "./repositories/SocketRepository";
import { SocketServer } from "./repositories/SocketServer";
import { AddPieceUseCase } from "./useCases/gameUseCases/addPiece/AddPieceUseCase";
import { GetTableUseCase } from "./useCases/gameUseCases/getTable/GetTableUseCase";
import { RestartUseCase } from "./useCases/gameUseCases/restart/RestartUseCase";
import { CreatePlayerUseCase } from "./useCases/playerUseCases/CreatePlayerUseCase";
import { CreateRoomUseCase } from "./useCases/roomUseCases/createRoom/CreateRoomUseCase";
import { JoinRoomUseCase } from "./useCases/roomUseCases/joinRoom/JoinRoomUseCase";
import { GameListenersUseCase } from "./useCases/gameUseCases/GameListenersUseCase";
import { RemovePlayerUseCase } from "./useCases/playerUseCases/RemovePlayerUseCase";

const socketServer: SocketRepository = new SocketServer();

const createPlayerUseCase = new CreatePlayerUseCase(socketServer);
const removePlayerUseCase = new RemovePlayerUseCase(socketServer);

const addPieceUseCase = new AddPieceUseCase(socketServer);
const getTableUseCase = new GetTableUseCase(socketServer);
const restartUseCase = new RestartUseCase(socketServer);

const createRoomUseCase = new CreateRoomUseCase(socketServer);
const joinRoomUseCase = new JoinRoomUseCase(socketServer);

const gameListenersUseCase = new GameListenersUseCase(socketServer);

export interface UseCaseContext {
  getSocketId: () => string;
  connected: boolean;
  createPlayerUseCase: CreatePlayerUseCase,
  removePlayerUseCase: RemovePlayerUseCase,
  addPieceUseCase: AddPieceUseCase,
  getTableUseCase: GetTableUseCase,
  restartUseCase: RestartUseCase,
  createRoomUseCase: CreateRoomUseCase,
  joinRoomUseCase: JoinRoomUseCase,
  gameListenersUseCase: GameListenersUseCase,
}

export const defaultValues = {
  getSocketId: () => socketServer.getId(),
  connected: socketServer.connected,
  createPlayerUseCase,
  removePlayerUseCase,
  addPieceUseCase,
  getTableUseCase,
  restartUseCase,
  createRoomUseCase,
  joinRoomUseCase,
  gameListenersUseCase,
}

export const useCaseContext =
  createContext<UseCaseContext>(defaultValues);