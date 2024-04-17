import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import { TbLogout, TbSettings } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { tv } from "tailwind-variants";
import Modal from "../../components/Modal";
import { Player } from "../../entities/Player";
import { useMicroAuth } from "../../hooks/useMicroAuth";
import { socket } from "../../socket";
import { transpose } from "../../utils/matrix";

const NUMBER_ROWS = 7;
const NUMBER_COLUMNS = 6;

const piece = tv({
  base: "h-16 w-16 rounded-full",
  variants: {
    player: {
      1: "bg-red-600",
      2: "bg-yellow-600",
      empty: "bg-gray-700",
    },
  },
});

const emptyTable: Player[][] = Array(NUMBER_ROWS)
  .fill(null)
  .map(() => Array(NUMBER_COLUMNS).fill(null));

function TableGame() {
  const [currentTable, setCurrentTable] = useState(emptyTable);
  const { logout } = useMicroAuth();
  const { state: roomId } = useLocation();

  function getTable() {
    socket.emit("getTable");
  }

  function restart() {
    socket.emit("restart");
  }

  const isPlayerOne = (id?: string) => {
    if (!id) return "empty";
    if (id === socket.id) return 1;
    return 2;
  };

  function addPiece(row: number) {
    socket.emit("addPiece", row);
  }

  useEffect(() => {
    function onDisconnect() {
      setCurrentTable(emptyTable);
      alert("Você acaba de se desconectar!");
    }

    function onTable(value: Player[][]) {
      setCurrentTable([...value]);
    }

    function onPlayerJoined(player: Player) {
      if (player.Id !== socket.id) {
        alert(`O jogador ${player.Name} acabou de entrar!`);
      } else {
        getTable();
      }
    }

    function onError(message: string) {
      console.error(message);
      alert(message);
    }

    function onWinner(player: Player) {
      if (player.Id === socket.id) {
        alert("Parabéns, você ganhou!");
      } else {
        alert("Ops, você perdeu!");
      }
    }

    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);
    socket.on("winner", onWinner);
    socket.on("table", onTable);
    socket.on("playerJoined", onPlayerJoined);

    return () => {
      socket.off("disconnect", onDisconnect);
      socket.off("error", onError);
      socket.off("table", onTable);
      socket.off("playerJoined", onPlayerJoined);
      socket.off("winner", onWinner);
    };
  }, []);

  return (
    <div>
      <header className="absolute top-0 left-0 w-full min-h-10 flex items-center justify-end">
        <Modal
          title="Settings"
          toggleButton={
            <button
              onClick={() => logout()}
              title="Logout"
              className="text-xl p-2"
            >
              <TbSettings />
            </button>
          }
        >
          <ul className="flex flex-col gap-2">
            <li>
              <section className="flex flex-col w-full">
                <span>Code room:</span>
                <div className="w-full flex">
                  <span className="flex flex-1 rounded bg-gray-700 p-2 my-2 min-h-10">
                    {roomId || "Error on get code Room"}
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
            </li>
            <li>
              <button
                onClick={() => restart()}
                title="Logout"
                className="px-2 rounded flex items-center hover:bg-gray-800"
              >
                Restart game
              </button>
            </li>
            <li>
              <button
                onClick={() => logout()}
                title="Logout"
                className="px-2 rounded flex items-center hover:bg-gray-800"
              >
                Logout
                <TbLogout className="ms-2 mt-1 text-red-600" />
              </button>
            </li>
          </ul>
        </Modal>
      </header>
      <table>
        <thead>
          <tr className="flex gap-2 mb-2">
            {currentTable.map((_, index) => (
              <th
                key={`head-${index}`}
                className="w-full flex justify-center items-center"
              >
                <button
                  onClick={() => addPiece(index)}
                  className="hover:text-gray-500"
                >
                  <CiCirclePlus size={36} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex flex-col gap-2">
          {transpose(currentTable).map((row, index) => (
            <tr key={`row-${index}`} className="flex w-full h-full gap-2">
              {row.map((currentPiece, indexPiece) => (
                <td
                  key={`piece-${indexPiece}`}
                  className={piece({ player: isPlayerOne(currentPiece?.Id) })}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableGame;
