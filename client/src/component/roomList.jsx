import { Link } from "react-router-dom";

function CardRoom({ data }) {
  return (
    <>
      <div className="w-[400px] h-[250px] bg-white flex justify-center items-center flex-col m-2">
        <h1 className="text-[25px]">{data && data.title}</h1>
        <h1 className="text-[20px]">{data && data.language}</h1>
        <Link to={`games/${data.id}`} className="px-24 py-2 bg-lime-300 mt-5">
          Join
        </Link>
      </div>
    </>
  );
}

export default CardRoom;
