import { useContext, useEffect, useState } from "react";
import { TabNavigation } from "./components/TabButton";
import Button from "../../components/Button";
import { FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../../context";

function SetupGame() {
  const [textRoom, setTextRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [typeSetup, setTypeSetup] = useState<"create" | "join">("join");
  const navigate = useNavigate();
  const { createRoomUseCase, joinRoomUseCase, gameListenersUseCase } =
    useContext(useCaseContext);

  function createRoom() {
    createRoomUseCase.execute();
  }

  function joinRoom() {
    setRoomId(textRoom);
    joinRoomUseCase.execute(textRoom);
  }

  function navigateToGame() {
    navigate("/liga-4", { state: roomId });
  }

  useEffect(() => {
    function onPlayerJoined() {
      navigateToGame();
    }

    function onDisconnect() {
      setRoomId("");
      alert("Você acaba de se desconectar!");
    }

    function onRoomCreated(id: string) {
      setRoomId(id);
      navigator.clipboard.writeText(id);
    }

    function onError(message: string) {
      console.error(message);
      alert(message);
    }

    gameListenersUseCase.setOnDisconnectCallback(onDisconnect);
    gameListenersUseCase.setOnErrorCallback(onError);
    gameListenersUseCase.setOnYouJoinedCallback(onPlayerJoined);
    gameListenersUseCase.setOnRoomCreatedCallback(onRoomCreated);

    return () => {
      gameListenersUseCase.off();
    };
  }, [roomId]);

  return (
    <div className="flex flex-col sm:w-96 w-full">
      <TabNavigation.Tab>
        <TabNavigation.Button
          active={typeSetup === "join"}
          onClick={() => setTypeSetup("join")}
        >
          Join Room
        </TabNavigation.Button>
        <TabNavigation.Button
          active={typeSetup === "create"}
          onClick={() => setTypeSetup("create")}
        >
          Create Room
        </TabNavigation.Button>
      </TabNavigation.Tab>
      <TabNavigation.Container active={typeSetup === "create"}>
        <div className="flex flex-col w-full justify-between">
          <section className="flex flex-col w-full">
            <span>Code:</span>
            <div className="w-full flex">
              <span className="flex flex-1 rounded bg-gray-700 p-2 my-2 min-h-10">
                {roomId || 'Click on "Create Room"'}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(roomId)}
                title="copy"
                className="flex items-center justify-center bg-gray-700 hover:bg-gray-900 active:bg-gray-500 ms-2 my-2 p-2 rounded"
              >
                <FaCopy />
              </button>
            </div>
          </section>
          <Button layout="secondary" onClick={() => createRoom()}>
            Create Room
          </Button>
          <Button onClick={() => navigateToGame()}>Start Game</Button>
        </div>
      </TabNavigation.Container>
      <TabNavigation.Container active={typeSetup === "join"}>
        <div className="flex flex-col w-full justify-between">
          <section className="flex flex-col">
            <label htmlFor="room-id">Room code</label>
            <input
              id="room-id"
              value={textRoom}
              onChange={({ target }) => setTextRoom(target.value)}
              className="rounded p-1 bg-gray-700 my-1"
              placeholder="Enter the room code"
            />
          </section>
          <Button onClick={() => joinRoom()}>Join Room</Button>
        </div>
      </TabNavigation.Container>
    </div>
  );
}

export default SetupGame;
