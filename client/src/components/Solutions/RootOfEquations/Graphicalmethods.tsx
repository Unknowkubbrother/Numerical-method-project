import { useState } from "react";
import React from "react";
import Graph from "../../ui/Graph";
import { graphicalApi } from "../../../Methods/RootApi";
import { GraphicalResponse } from "../../../Interfaces/Graphicalmethods";
import Table from "../../ui/Table";
import { useOutletContext } from "react-router-dom";

function Graphicalmethods() {
  // Assuming the context provides a string for the equation, adjust the type as necessary
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [equation, setEquation] =
    useOutletContext<[string, React.Dispatch<React.SetStateAction<string>>]>();
  const [xStart, setXStart] = useState<number>(NaN);
  const [xEnd, setXEnd] = useState<number>(NaN);
  const [errorfactor, seterrorfacoter] = useState<number>(0.000001);
  const [Data, setData] = useState<GraphicalResponse | null>(null);

  const handleSetEquation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquation(e.target.value);
  };

  const handleSetXStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXStart(Number(e.target.value));
  };

  const handleSetXEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXEnd(Number(e.target.value));
  };

  const handleSetError = (e: React.ChangeEvent<HTMLInputElement>) => {
    seterrorfacoter(Number(e.target.value));
  };

  const sendRequest = async () => {
    const result: GraphicalResponse = await graphicalApi(
      xStart,
      xEnd,
      equation,
      errorfactor
    );
    setData(result);
  };

  return (
    <div className="w-full mt-5">
      <div className="w-full flex gap-5">
        <div className="w-[20%] flex flex-col gap-2 justify-start items-start">
          <label className="font-semibold">Equation</label>
          <input
            type="text"
            name="Equation"
            className="w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
            placeholder="43x-180"
            onInput={handleSetEquation}
            value={equation}
          />
          <label className="font-semibold">X Start</label>
          <input
            type="number"
            name="xstart"
            className="w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
            placeholder="1.00"
            onInput={handleSetXStart}
            value={xStart}
          />
          <label className="font-semibold">X End</label>
          <input
            type="number"
            name="xend"
            className="w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
            placeholder="10.00"
            onInput={handleSetXEnd}
            value={xEnd}
          />
          <label className="font-semibold">Error threshold 𝜖</label>
          <input
            type="number"
            name="error"
            className="w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
            placeholder="0.000001"
            onInput={handleSetError}
            value={errorfactor}
          />
          <button
            className="p-2 mt-2 bg-secondary rounded-lg hover:scale-105 duration-300"
            onClick={sendRequest}
          >
            Calculate!
          </button>
        </div>

        <div className="w-[73%] h-[550px] rounded-lg pt-5 px-5 flex flex-col bg-white">
          <span className="text-gray-700 font-semibold">Graph</span>
          <div className="w-full h-full">
            <Graph data={Data as GraphicalResponse} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col my-10">
        <span className="my-2 font-semibold">TABLE</span>
        <Table data={Data as GraphicalResponse} />
      </div>
    </div>
  );
}

export default Graphicalmethods;
