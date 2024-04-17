import { Link, useRouteError } from "react-router-dom";

export default function GenericError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Ops...</h1>
      <span className="my-4">Ocorreu um erro inesperado :(</span>
      <Link to="/">Voltar para a tela inicial</Link>
    </div>
  );
}
