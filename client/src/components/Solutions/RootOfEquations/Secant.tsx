import { useState } from "react";
import React from "react";
import Graph from "../../ui/Graph";
import { SecantMethod , SecantResponse} from "../../../Methods/rootMethods/secant";
import Table from "../../ui/Table";
import { useOutletContext } from "react-router-dom";

function Secant() {
  // Assuming the context provides a string for the equation, adjust the type as necessary
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [equation, setEquation] =
    useOutletContext<[string, React.Dispatch<React.SetStateAction<string>>]>();
  const [xInitial0, setxInitial0] = useState<number>(0);
  const [xInitial1, setxInitial1] = useState<number>(0);
  const [errorfactor, seterrorfacoter] = useState<number>(0.000001);
  const [Data, setData] = useState<SecantResponse | null>(null);

  const handleSetEquation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquation(e.target.value);
  };

  const handleSetxInitial0 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setxInitial0(Number(e.target.value));
  };

  const handleSetxInitial1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setxInitial1(Number(e.target.value));
  };

  const handleSetError = (e: React.ChangeEvent<HTMLInputElement>) => {
    seterrorfacoter(Number(e.target.value));
  };

  const sendRequest = async () => {
    const result: SecantResponse = await SecantMethod(
      xInitial0,
      xInitial1,
      equation,
      errorfactor
    );
    setData(result);
  };

  return (
    <div className="w-full mt-5">
      <div className="w-full flex min-[340px]:flex-col lg:flex-row gap-5 min-[340px]:justify-center min-[340px]:items-center lg:justify-start lg:items-start">
        <div className="min-[340px]:w-full lg:w-[20%] flex flex-col gap-5 justify-center items-center">
          <div className="min-[340px]:w-full md:w-[90%] lg:w-full min-[340px]:grid min-[340px]:grid-cols-2 grid-rows-2 min-[340px]:gap-2 lg:flex lg:flex-col lg:gap-5 m-auto">
            <div className="flex flex-col gap-2 min-[340px]:items-center lg:justify-start lg:items-start">
              <label className="font-semibold">Equation</label>
              <input
                type="text"
                name="Equation"
                className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[200px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                placeholder="43x-180"
                onInput={handleSetEquation}
                value={equation}
              />
            </div>
            <div className="flex flex-col gap-2 min-[340px]:items-center lg:justify-start lg:items-start">
              <label className="font-semibold">xInitial 0</label>
              <input
                type="number"
                name="xstart"
                className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[200px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                placeholder="1.00"
                onInput={handleSetxInitial0}
                value={xInitial0}
              />
            </div>
            <div className="flex flex-col gap-2 min-[340px]:items-center lg:justify-start lg:items-start">
              <label className="font-semibold">xInitial 1</label>
              <input
                type="number"
                name="xstart"
                className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[200px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                placeholder="1.00"
                onInput={handleSetxInitial1}
                value={xInitial1}
              />
            </div>
            <div className="flex flex-col gap-2 min-[340px]:items-center lg:justify-start lg:items-start">
              <label className="font-semibold">Error threshold 𝜖</label>
              <input
                type="number"
                name="error"
                className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[200px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                placeholder="0.000001"
                onInput={handleSetError}
                value={errorfactor}
              />
            </div>
          </div>
          <div className="w-full flex min-[340px]:justify-center min-[340px]:items-center lg:justify-start lg:items-start">
            <button
              className="min-[340px]:w-[250px] lg:w-[200px] p-2 mt-2 bg-secondary rounded-lg hover:scale-105 duration-300"
              onClick={sendRequest}
            >
              Calculate!
            </button>
          </div>
        </div>

        <div className="min-[340px]:w-full lg:w-[85%] xl:w-[73.5%] h-[550px] rounded-lg pt-5 px-5 flex flex-col bg-white">
          <span className="text-gray-700 font-semibold">Graph</span>
          <div className="w-full h-full">
            <Graph data={Data as SecantResponse} func={Data ? equation : null}/>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col my-10">
        <span className="my-2 font-semibold">TABLE</span>
        <Table data={Data as SecantResponse} />
      </div>
    </div>
  );
}

export default Secant;