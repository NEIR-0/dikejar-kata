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
      <section className="winImg w-full h-screen flex justify-center items-center relative">
        <div className="w-[20%] h-[270px] shadow-lg border border-gray-400 bg-red-500 p-10 rounded-lg flex justify-center items-center flex-col">
          <i className="fa-solid fa-user text-[100px] mt-12t text-white" />
          <h1 className="text-[40px] text-white">{winner}</h1>
        </div>

        <Link to="/" className="px-10 py-2 bg-white fixed right-10 bottom-10">
          back
        </Link>
      </section>
    </>
  );
}

export default Winner;
