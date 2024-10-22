// import React from "react";
import {round} from 'mathjs'

function TableInterpolation(props : {data : {iterations : {x : number | number[], y : number}[]}}) {
  return (
    <div className="w-full rounded-md overflow-hidden bg-[#07151b]">
      <div className="overflow-x-auto">
        <table className="table table-zebra caption-bottom">
          {/* head */}
          { (!props.data) && <caption className="mt-4 text-sm text-muted-foreground">Please enter the formula</caption> }
          <thead className="bg-[#16232e] border-b-2 border-sky-500">
            <tr>
              <th>i</th>
              <th>Xi</th>
              <th>Yi</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            { (props.data) ?  props?.data?.iterations?.map((item: { x: number | number[]; y: number; }, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>
                    {Array.isArray(item?.x) ? 
                      item?.x.map((x, i) => {
                        return (
                          <div key={i}>{round(x,6)}</div>
                        );
                      }) : 
                      round(item?.x,6)
                    }
                  </td>
                  <td>{round(item?.y,6)}</td>
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

export default TableInterpolation;
