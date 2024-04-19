import { useState } from "react";
import { useMicroAuth } from "../hooks/useMicroAuth";
import Button from "../components/Button";

export default function MicroAuth() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const { login } = useMicroAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(name);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-72 sm:h-auto  sm:w-96 w-full"
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          minLength={4}
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="rounded p-1 bg-gray-700 my-1"
          placeholder="How would you like to be called?"
        />
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}
