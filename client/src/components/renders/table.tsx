// import React from "react";

function Table() {
  return (
    <div className="w-full rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-[#152836] border-b-2 border-sky-500">
            <tr>
              <th>iter</th>
              <th>X</th>
              <th>Y</th>
              <th>error</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="bg-zinc-800">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
