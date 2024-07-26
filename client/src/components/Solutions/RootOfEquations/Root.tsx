import React from "react";
import { useState } from "react";
import { mainMenu } from "../../../Configs/Configs";
import { Outlet, useNavigate } from "react-router-dom";
import MathUI from "../../ui/mathui";

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


  return (
    <>
      <div className="w-full mt-10 flex flex-col lg:flex-row justify-start items-center gap-5">
        <div className="lg:w-[18%] xl:w-[15%] flex min-[340px]:justify-center min-[340px]:items-center lg:flex-col lg:justify-start lg:items-start gap-2">
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

        <div className="min-[340px]:w-[90%] md:-[75%] lg:w-[70%] flex justify-center items-centers m-auto">
          <div className="w-full h-[100px] bg-background rounded-lg flex justify-center items-center">
              <MathUI equation={equation}/>
              
          </div>
        </div>
      </div>
      <div className="min-[340px]:w-[90%] lg:w-full m-auto">
        <Outlet context={[equation, setEquation]} />
      </div>
    </>
  );
}

export default Root;
