import { useState, useEffect} from "react";
import { mainMenu } from "../../Configs/Configs";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {useContext} from "react";
import {MyFunctionContext} from "../../App";

function Lobby() {
  const navigate = useNavigate();
  const [selectedMenu, setselectedMenu] = useState(mainMenu[0].title);
  const {setLoading,loading,loadingSecond} = useContext(MyFunctionContext);
  const location = useLocation();

  const handlerSetRouter = (item: {
    title: string;
    path: string;
    menu: { title: string; path: string }[];
  }) => {
    if (item.menu.length > 0) {
      navigate(item.menu[0].path);
    } else {
      navigate(item.path);
    }
  };

  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    mainMenu.forEach((item) => {
      if (location.pathname.split("/")[2] == item.path.split("/")[2]) {
        setselectedMenu(item.title);
      }
    });
    // console.log
  }, [location.pathname]);

  return (
    <>
    {!loading && (
        <div className={`w-full relative ${loadingSecond ? 'blur select-none' : ''}`}>
        <div className="w-full mt-[100px]">
          <div className="min-[340px]:w-[75%] lg:w-[90%] 2xl:w-[70%] h-content m-auto list-none flex gap-5 justify-center items-center flex-wrap">
            {mainMenu.map(
              (
                item: {
                  title: string;
                  path: string;
                  menu: { title: string; path: string }[];
                },
                index: number
              ) => {
                return (
                  <button
                    className={`btn text-white hover:bg-primary hover:scale-105 ${
                      selectedMenu == item.title ? "bg-primary" : ""
                    }`}
                    key={index}
                    onClick={() => handlerSetRouter(item)}
                  >
                    {item.title}
                  </button>
                );
              }
            )}
          </div>

          <div className={`min-[340px]:w-full lg:w-[95%] m-auto ${location.pathname.split("/")[2] == 'root' ? `2xl:w-[70%]` : `2xl:w-[90%]`}`}>
            <Outlet />
          </div>
        </div>
    </div>
    )}
    </>
  );
}

export default Lobby;
