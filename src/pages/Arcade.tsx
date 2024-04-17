import { Link } from "react-router-dom";

export default function Arcade() {
  return (
    <div>
      <Link
        to="/liga-4/setup"
        className="flex flex-col items-center justify-center rounded p-2 hover:bg-gray-800 border-2 border-gray-800"
      >
        <div className="grid grid-cols-2 gap-1">
          <div className="bg-red-600 h-8 w-8 rounded-full" />
          <div className="bg-yellow-600 h-8 w-8 rounded-full" />
          <div className="bg-yellow-600 h-8 w-8 rounded-full" />
          <div className="bg-red-600 h-8 w-8 rounded-full" />
        </div>
        <span className="font-medium text-lg">Liga 4</span>
      </Link>
    </div>
  );
}
