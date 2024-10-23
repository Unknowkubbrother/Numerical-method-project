import { useState, useEffect } from "react";
import { mainMenu } from "../../../Configs/Configs";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Inputintegration from "../../ui/Inputintegration";

interface MenuItem {
    title: string;
    menu: {
        title: string;
        path: string;
    }[];
}

interface Values {
    a: number;
    b: number;
    equation: string;
    n?: number;
}

function Integration() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedSubMenu, setselectedSubMenu] = useState("");
    const [data, setData] = useState<Values>();

    const setSubMenu = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedSubMenu(e.target.value);
        navigate(e.target.value);
    };

    useEffect(() => {
        mainMenu.forEach((item: MenuItem) => {
            item.menu.forEach((subItem) => {
                if (subItem.path === location.pathname) {
                    setselectedSubMenu(subItem.path);
                }
            });
        });
    }, [location.pathname]); // Add dependency array here

    const getValues = (values: Values) => {
        setData(values);
    };

    return (
        <div className="w-full flex justify-center items-center flex-col">
            <div className="mt-10">
                <select
                    className="select select-bordered w-content text-center"
                    value={selectedSubMenu}
                    onChange={setSubMenu}
                >
                    {mainMenu.map((item: MenuItem) => {
                        if (item.title === "Integration") {
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
                        return null;
                    })}
                </select>
            </div>
            <Inputintegration getValues={getValues} />
            <div className="min-[340px]:w-[90%] lg:w-full m-auto">
                <Outlet context={[data]} />
            </div>
        </div>
    );
}

export default Integration;
