import { useState } from "react";
import TableMatrix from "../../ui/TableMatrix";

function Linear() {
  const [countMatrix, setCountMatrix] = useState(3);

  const handleSetCountMatrix = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountMatrix(e.target.value as unknown as number);
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <input
        type="number"
        className="mt-10 rounded-md px-5 py-2 w-[200px] text-center"
        placeholder="3"
        value={countMatrix}
        onChange={handleSetCountMatrix}
      />
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <TableMatrix count={countMatrix} />
        </div>
      </div>
    </div>
  );
}

export default Linear;
