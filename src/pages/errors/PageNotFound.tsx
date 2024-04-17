import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">
        Ops...
      </h1>
    <span className="my-4">
      Parece que você esta perdido, que tal voltarmos ao começo?
    </span>
    <Link to="/" >Voltar para a tela inicial</Link>
  </div>
  )
}