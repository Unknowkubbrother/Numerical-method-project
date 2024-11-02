import { useState,useEffect } from 'react';
import Plot from 'react-plotly.js';
import { GraphicalResponse} from "../../Methods/rootMethods/graphical";
import { OnePointResponse } from '../../Methods/rootMethods/onepoint';
import { NewTonResponse} from '../../Methods/rootMethods/newton';
import { SecantResponse} from '../../Methods/rootMethods/secant';
import {range,evaluate,round} from 'mathjs'

function Graph(props : {data : GraphicalResponse | OnePointResponse | NewTonResponse | SecantResponse, func : string | null}) {  
  const [Data,setData] = useState<{x: number[], y: number[]}>({x:[],y:[]})
  const [MainData,setDataMain] = useState<{x: number[], y: number[]}>({x:[],y:[]})
  const [OnepointX, setOnepointX] = useState<{x: number[], y: number[]}>({x:[],y:[]})
  const [dotplotonepoint, setDotplotonepoint] = useState<Array<{
    x: number[];
    y: number[];
    mode: string;
    name: string;
    line: {
        color: string;
        dash: string;
        width: number;
    };
  }>>([]);
  const [Result, setResult] = useState<{x: number[], y: number[]}>({x:[],y:[]});

  useEffect(() => {
    let data;
    if (location.pathname.split("/")[3] != "onepoint" && location.pathname.split("/")[3] != "newton" && location.pathname.split("/")[3] != "secant"){
      data = props?.data?.iterations?.map((item) => {
        return {x:item.x,y:item.y}
      }) || [];
      // result.sort((a, b) => a.x - b.x);
    }else{
      data = (props?.data as OnePointResponse | NewTonResponse | SecantResponse)?.plot?.map((item) => {
        return {x:item.x,y:item.y}
      }) || [];
    }
    setData({x:data.map((item) => item.x), y:data.map((item) => item.y)})
    const result = [{x: props?.data?.result?.x, y: props?.data?.result?.y}];
    setResult({x:result.map((item) => item.x), y:result.map((item) => item.y)})
    

    if(props.func && data){
      const xMainValues = location.pathname.split("/")[3] != "onepoint" ? range(-10, 10, 0.01).toArray() as number[] : range(0, 10, 0.002).toArray() as number[];
      const yMainValues = xMainValues.map(function (x) {
        return evaluate(props?.func ?? '',{x: x}) as number;
      });
      setDataMain({x:xMainValues,y:yMainValues});
    }else{
      setDataMain({x:[],y:[]});
    }

    if (location.pathname.split("/")[3] == "onepoint" && props.func){
      const xMainValues = range(0, 10, 0.002).toArray() as number[];
      const yMainValues = xMainValues.map(function (x) {
        return x;
      });
      setOnepointX({x:xMainValues,y:yMainValues});

      const dotplot = (props?.data as OnePointResponse)?.dotplot?.map((item) => {
        return {x:item.x,y:item.y}
      }) || [];
      dotplot.sort((a, b) => a.x - b.x);
  
      const datadot = dotplot.map(item=>({
        x: [item.x,item.x],
        y: [item.y,item.x],
        mode: 'lines',
        name: 'x='+ round(item.x,6),
        line: {
          color: '#D20062',
          dash: 'dash',
          width: 1,
        },
      }));
      setDotplotonepoint(datadot);
  
    }else{
      setOnepointX({x:[],y:[]});
      setDotplotonepoint([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props?.data])

  return (
    <div className='w-full h-full rounded-lg overflow-hidden'>
      <Plot className='w-full h-[98%] justify-center items-center'
        data={
          [
          {
            ...Result,
            mode: 'markers',
            name: 'Result',
            marker: {
              color: '#7b00ff',
              size: 10,
            },
          },
          {
            ...Data,
            mode: 'lines+markers',
            name: "Values",
            line: {
              color: '#eba834',
              width: 2,
            },
            marker: {
              color: '#e0416c',
            },
          },
          {
            ...MainData,
            mode: 'lines',
            line: {
              color: '#4db5ff',
              shape: 'spline',
              width: 2,
            },
            // fill: 'tozeroy',
            name: 'Main Graph',
          },
          {
            ...OnepointX,
            mode: 'lines',
            line: {
              color: '#42f5b3',
              width: 2,
            },
            name: 'x=x',
          },
          ...dotplotonepoint
        ]
      }
        layout={{
          margin: { t: 35, r: 0, b: 35, l: 35 },
          dragmode: 'pan',
          autosize: true,
        }
      }
        config={{
          scrollZoom: true,
        }}
        
      />
    </div>
  )
}

export default Graph