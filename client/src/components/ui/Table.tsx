// import React from "react";
import {GraphicalResponse} from '../../Interfaces/Graphicalmethods'
import {round} from 'mathjs'

function Table(props : {data : GraphicalResponse}) {
  console.log(props)
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
                  <td>{(item?.error) ? item?.error : "NaN"}</td>
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
