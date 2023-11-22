function TableRoom({ data, id }) {
  return (
    <>
      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          1
        </th>
        <td className="px-6 py-4">uidn</td>
      </tr>
      {/* <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {id && id}
        </th>
        <td className="px-6 py-4">{data && data}</td>
        <td className="px-6 py-4">
          <button className="px-5 py-1 bg-red-600 text-white">x</button>
        </td>
      </tr> */}
    </>
  );
}

export default TableRoom;
