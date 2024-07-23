import React from "react";
import { useState } from "react";
import { mainMenu } from "../../../Configs/Configs";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

interface MenuItem {
  title: string;
  menu: {
    title: string;
    path: string;
  }[];
}

function Root() {
  const navigate = useNavigate();
  const [selectedSubMenu, setselectedSubMenu] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [equation, setEquation] = useState("");

  const setSubMenu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedSubMenu(e.target.value);
    navigate(e.target.value);
    setEquation("");
  };

  const location = useLocation();

  // ฟังก์ชันสำหรับแทนที่ตัวแปร x ด้วย xi
    const replaceVariable = (equation : string) => {
      return (location.pathname.split('/')[3] != 'onepoint') ? equation.replace(/xi/g, `x{_i}`) : equation.replace(/x/g, `x{_i}`);
    };

    const MathEquation = ({ equation } : {equation : string}) => {
      const formattedEquation = replaceVariable(equation);

      return (
        <div>
          <BlockMath math={formattedEquation} />
        </div>
      );
    };

  return (
    <>
      <div className="w-full mt-10 flex justify-start items-center gap-5">
        <div className="w-[15%] flex flex-col gap-2">
          <span>Solutions</span>
          <select
            className="select select-bordered "
            value={selectedSubMenu}
            onChange={setSubMenu}
          >
            {mainMenu.map((item: MenuItem) => {
              if (item.title === "Root of Equation") {
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

        <div className="w-[70%] flex justify-center items-centers m-auto">
          <div className="w-full h-[100px] bg-background rounded-lg flex justify-center items-center">
            <span className="font-semibold flex justify-center items-center gap-2">
              <span className="text-xl">
                  {location.pathname.split('/')[3] != 'onepoint' ? 
                  <MathEquation equation={"f(x)"}/>
                   :
                   <MathEquation equation={("x_{n+1}")}/>} </span> = 
                <span className="ml-2">{equation == "" ? ". . ." : <MathEquation equation={equation}/>}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Outlet context={[equation, setEquation]} />
      </div>
    </>
  );
}

export default Root;
