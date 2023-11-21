import { useState } from "react";

function WaitingRoom() {
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
              <tr class="bg-white border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">
                  <button className="px-5 py-1 bg-red-600 text-white">x</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default WaitingRoom;
