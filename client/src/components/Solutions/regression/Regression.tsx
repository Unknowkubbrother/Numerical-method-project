import {  useState ,useEffect } from "react";
import { mainMenu } from "../../../Configs/Configs";
import { useNavigate,Outlet } from "react-router-dom";
// import InputRegression from "../../ui/InputRegression";

interface MenuItem {
  title: string;
  menu: {
    title: string;
    path: string;
  }[];
}

// interface Values {
//     x: number[] | undefined; 
//     points: { x: number; y: number; selected: boolean; }[]; 
// }

function Regression() {
  const navigate = useNavigate();
  const [selectedSubMenu, setselectedSubMenu] = useState("");
//   const [Data , setData] = useState<Values>({x: undefined, points: []});

  const setSubMenu= (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedSubMenu(e.target.value);
    navigate(e.target.value);
  };

//   const getValues = (value : Values) => {
//     const points = value.points.map(point => {
//       return {
//         x: Number(point.x),
//         y: Number(point.y),
//         selected: Boolean(point.selected)
//       }
//     });
//     const x = value.x?.map(x => Number(x));
//     setData(
//       {
//         x,
//         points
//       }
//     );
//   }

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
            className="select select-bordered w-content text-center"
            value={selectedSubMenu}
            onChange={setSubMenu}
          >
            {mainMenu.map((item: MenuItem) => {
              if (item.title === "Regression") {
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
      {/* <InputRegression getValues={getValues}/> */}
      <div className="min-[340px]:w-[90%] lg:w-full m-auto">
        <Outlet/>
      </div>
    </div>
  );
}

export default Regression;
