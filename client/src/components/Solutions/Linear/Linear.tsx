import { useState } from "react";
import TableMatrix from "../../ui/TableMatrix";
import { mainMenu } from "../../../Configs/Configs";
import { useNavigate,Outlet } from "react-router-dom";

interface MenuItem {
  title: string;
  menu: {
    title: string;
    path: string;
  }[];
}


function Linear() {
  const navigate = useNavigate();
  const [selectedSubMenu, setselectedSubMenu] = useState("");
  const [Data , setData] = useState<{matrixA : number[][], arrB : number[]}>({matrixA : [], arrB : []});

  const setSubMenu= (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedSubMenu(e.target.value);
    navigate(e.target.value);
  };

  const [countRow, setCountRow] = useState(3);
  const [countCol, setCountCol] = useState(3);

  const handleSetCountRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountRow(e.target.value as unknown as number);
  };

  const handleSetCountCol = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountCol(e.target.value as unknown as number);
  };

  const getValues = (matrixA:number[][], arrB:number[]) =>{
    setData({matrixA, arrB});
  }


  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="mt-10">
      <select
            className="select select-bordered w-[200px] text-center"
            value={selectedSubMenu}
            onChange={setSubMenu}
          >
            {mainMenu.map((item: MenuItem) => {
              if (item.title === "Linear Algebraic Equation") {
                return item.menu.map(
                  (subItem: { title: string; path: string }, index: number) => {
                    return (
                      <option key={index} value={subItem.path}>
                        {subItem.title}
                      </option>
                    );
                  }
                );
              }
            })}
          </select>
      </div>
      <div className="flex gap-3 justify-center items-center mt-10">
        <span>Row</span>
        <input
          type="number"
          className="rounded-md px-5 py-2 w-[100px] text-center"
          placeholder="N"
          value={countRow}
          onChange={handleSetCountRow}
        />
        <span>Column</span>
        <input
          type="number"
          className="rounded-md px-5 py-2 w-[100px] text-center"
          placeholder="M"
          value={countCol}
          onChange={handleSetCountCol}
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <TableMatrix row={countRow} col={countCol} getValues={getValues}/>
        </div>
      </div>
      <div className="min-[340px]:w-[90%] lg:w-full m-auto">
        <Outlet context={[Data]}/>
      </div>
    </div>
  );
}

export default Linear;
