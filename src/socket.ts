import { io } from 'socket.io-client';
import { useLocalUser } from './hooks/useLocalUser';

export const socket = io(import.meta.env.VITE_URL_SOCKET);

const [user] = useLocalUser();

socket.on("connect", () => {
  socket.emit("createPlayer", user);
});