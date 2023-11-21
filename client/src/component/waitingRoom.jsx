import BackButton from "./backButton";
import TableRoom from "./tableRoom";
function WaitingRoom({ data, player }) {
  return (
    <>
      <section className="w-full h-fit bg-purple-500 flex p-10 items-center flex-col relative">
        <BackButton />
        <h1 className="text-[40px] mb-5">{data && data.status} Rooms</h1>
        <p className="text-[20px]">
          title: <span className="text-white">{data && data.title}</span>
        </p>
        <p className="text-[20px] mb-6">
          language: <span className="text-white">{data && data.language}</span>
        </p>

        {/* start */}
        {data.isGameMaster === true ? (
          <div className="w-[70%] my-4">
            <button className="px-16 py-3 bg-blue-600">Start</button>
          </div>
        ) : (
          ""
        )}

        <div className="w-[70%]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  username
                </th>
                <th scope="col" className="px-6 py-3">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {player &&
                player.map((el, index) => {
                  return <TableRoom key={el.id} data={el} id={index + 1} />;
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default WaitingRoom;
