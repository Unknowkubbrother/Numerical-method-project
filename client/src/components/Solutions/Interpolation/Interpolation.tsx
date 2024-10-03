import {  useState } from "react";
import { mainMenu } from "../../../Configs/Configs";
import { useNavigate,Outlet } from "react-router-dom";
import InputInterpolation from "../../ui/InputInterpolation";

interface MenuItem {
  title: string;
  menu: {
    title: string;
    path: string;
  }[];
}

interface Values {
    x: number | undefined; 
    points: { x: number; y: number; selected: boolean; }[]; 
}

function Interpolation() {
  const navigate = useNavigate();
  const [selectedSubMenu, setselectedSubMenu] = useState("");
  const [Data , setData] = useState<Values>({x: undefined, points: []});

  const setSubMenu= (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedSubMenu(e.target.value);
    navigate(e.target.value);
  };

  const getValues = (value : Values) => {
    const points = value.points.map(point => {
      return {
        x: Number(point.x),
        y: Number(point.y),
        selected: Boolean(point.selected)
      }
    });
    const x = value.x != undefined ? Number(value.x) : undefined;
    setData(
      {
        x,
        points
      }
    );
  }


  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="mt-10">
      <select
            className="select select-bordered w-content text-center"
            value={selectedSubMenu}
            onChange={setSubMenu}
          >
            {mainMenu.map((item: MenuItem) => {
              if (item.title === "Interpolation") {
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
      <InputInterpolation getValues={getValues}/>
      <div className="min-[340px]:w-[90%] lg:w-full m-auto">
        <Outlet context={[Data]}/>
      </div>
    </div>
  );
}

export default Interpolation;
