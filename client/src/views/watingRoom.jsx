import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TableRoom from "../component/tableRoom";

function WaitingRoom() {
  const params = useParams();
  useEffect(() => {}, []);
  const listPlayer = async (e) => {
    try {
      const axios = await axios.get("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full h-screen bg-purple-500 flex p-10 items-center flex-col">
        <h1 className="text-[100px]">Waiting Rooms</h1>
        {/* start */}
        <div className="w-[70%] my-4">
          <button className="px-16 py-3 bg-blue-600">Start</button>
        </div>
        <div class="w-[70%]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  id
                </th>
                <th scope="col" class="px-6 py-3">
                  username
                </th>
                <th scope="col" class="px-6 py-3">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRoom />
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default WaitingRoom;
