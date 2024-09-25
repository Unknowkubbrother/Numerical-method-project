import { useState } from "react";
import TableMatrix from "../../ui/TableMatrix";

function Linear() {
  const [countRow, setCountRow] = useState(3);
  const [countCol, setCountCol] = useState(3);

  const handleSetCountRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountRow(e.target.value as unknown as number);
  };

  const handleSetCountCol = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountCol(e.target.value as unknown as number);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="flex gap-3 justify-center items-center mt-10">
        <span>Row</span>
        <input
          type="number"
          className="rounded-md px-5 py-2 w-[100px] text-center"
          placeholder="3"
          value={countRow}
          onChange={handleSetCountRow}
        />
        <span>Column</span>
        <input
          type="number"
          className="rounded-md px-5 py-2 w-[100px] text-center"
          placeholder="3"
          value={countCol}
          onChange={handleSetCountCol}
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <TableMatrix row={countRow} col={countCol} />
        </div>
      </div>
    </div>
  );
}

export default Linear;
