
function TableRoom({ data }) {
  return (
    <>
      <tr class="bg-white border-b">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          Apple MacBook Pro 17"
        </th>
        <td class="px-6 py-4">Silver</td>
        <td class="px-6 py-4">
          <button className="px-5 py-1 bg-red-600 text-white">x</button>
        </td>
      </tr>
    </>
  );
}

export default TableRoom;
