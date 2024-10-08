import { useState,useRef,useEffect } from "react";
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

interface ref{
  clearMatrix: () => void;
}


function Linear() {
  const navigate = useNavigate();
  const [selectedSubMenu, setselectedSubMenu] = useState("");
  const [Data , setData] = useState<{matrixA : number[][], arrB : number[], xi : number[] , errorFactor: number}>({matrixA : [], arrB : [], xi : [], errorFactor: 0.00001});

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

  const getValues = async (matrixA:number[][], arrB:number[], xi : number[], errorFactor : number) =>{
    await setData({matrixA, arrB, xi, errorFactor});
  }

  const ref = useRef<ref>(null);

  const clearMatrix = () => {
       setCountCol(0);
       setCountRow(0);
       setCountCol(3);
       setCountRow(3);
       ref.current?.clearMatrix();
  };

  const setRow = (num:number)=>{
    setCountRow(num);
  }

  const setCol = (num:number) => {
    setCountCol(num);
  }

  
  useEffect(() => {
    mainMenu.forEach((item: MenuItem) => {
      item.menu.forEach((subItem) => {
        if (subItem.path === location.pathname) {
          setselectedSubMenu(subItem.path);
        }
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);


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
        <button className="btn bg-rose-400 hover:bg-rose-600 text-white" onClick={clearMatrix}><i className="fa-solid fa-rotate-left"></i></button>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <TableMatrix row={countRow} col={countCol} getValues={getValues} ref={ref} setRow={setRow} setCol={setCol}/>
        </div>
      </div>
      <div className="min-[340px]:w-[90%] lg:w-full m-auto">
        <Outlet context={[Data]}/>
      </div>
    </div>
  );
}

export default Linear;
