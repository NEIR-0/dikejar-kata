import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Winner() {
  const [winner, setWinner] = useState("");
  const { gameId } = useParams();

  async function fetchResult() {
    try {
      const { data } = await axios.get(`http://localhost:3000/games/${gameId}/result`, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });

      console.log(data);

      setWinner(data.result.winner);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <>
      <section className="w-full h-screen bg-purple-500 flex justify-center items-center relative">
        <div className="w-[30%] h-fit p-10 rounded-lg bg-white flex justify-center items-center flex-col">
          <h1 className="text-[40px]">winner is ..</h1>
          <i className="fa-solid fa-user text-[100px] mt-12" />
          <h1 className="text-[40px]">{winner}</h1>
        </div>

        <Link to="/" className="px-10 py-2 bg-white fixed right-10 bottom-10">
          back
        </Link>
      </section>
    </>
  );
}

export default Winner;
