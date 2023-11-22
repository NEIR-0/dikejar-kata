import BackButton from "../component/backButton";
import TableRoom from "../component/tableRoom";
import socket from "../socket";
import { Link, useParams } from "react-router-dom";

function WaitingRoom({ data, player }) {
  const { gameId } = useParams();
  function startHandler() {
    socket.emit("CLIENT_START", { gameId, access_token: localStorage.access_token });
  }

  return (
    <>
      <section className="bgWaitingRooms w-full h-screen ">
        <div className="flex p-10 items-center flex-col relative backdrop-blur-sm">
          <BackButton />
          <h1 className="text-[40px] mb-5 font-bold text-orange-400">{data && data.status} Rooms</h1>
          <p className="text-[20px] text-white">
            title: <span className="text-orange-400 font-bold">{data && data.title}</span>
          </p>
          <p className="text-[20px] text-white mb-6">
            language: <span className="text-orange-400 font-bold">{data && data.language}</span>
          </p>

          {/* start */}
          {data.isGameMaster === true ? (
            <div className="w-[40%] my-4">
              <Link to={`/games/${gameId}/start`} onClick={startHandler} className="px-16 py-3 bg-purple-500 text-white rounded-md">
                Start
              </Link>
            </div>
          ) : (
            ""
          )}

          <div className="w-[40%]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    username
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                  action
                </th> */}
                </tr>
              </thead>
              <tbody>
                {/* <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom />
                <TableRoom /> */}

                {player &&
                player.map((el, index) => {
                  return <TableRoom key={el.id} data={el} id={index + 1} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default WaitingRoom;
