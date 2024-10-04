// import React from "react";
import { GraphicalResponse} from "../../Methods/rootMethods/graphical";
import { BisectionResponse} from "../../Methods/rootMethods/bisection";
import { FalsePositionResponse} from "../../Methods/rootMethods/falsePosition";
import { OnePointResponse } from "../../Methods/rootMethods/onepoint";
import {NewTonResponse} from "../../Methods/rootMethods/newton";
import {SecantResponse} from "../../Methods/rootMethods/secant";
import {round} from 'mathjs'

function Table(props : {data : GraphicalResponse | BisectionResponse | FalsePositionResponse | OnePointResponse | NewTonResponse | SecantResponse}) {
  return (
    <div className="w-full rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-zebra caption-bottom">
          {/* head */}
          { (!props.data) && <caption className="mt-4 text-sm text-muted-foreground">Please enter the formula</caption> }
          <thead className="bg-[#152836] border-b-2 border-sky-500">
            <tr>
              <th>iter</th>
              <th>X</th>
              <th>Y</th>
              <th>error</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            { (props.data) ?  props?.data?.iterations?.map((item: { x: number; y: number; error?: number }, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{round(item?.x,6)}</td>
                  <td>{round(item?.y,6)}</td>
                  <td>{(item?.error) ? (round(item?.error,6)) + '%' : "NaN"}</td>
                </tr>
              );
            }) : 
              null
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
