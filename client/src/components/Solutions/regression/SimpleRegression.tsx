import {useState,useContext} from 'react'
import InputSimpleRegression from '../../ui/InputSimpleRegression'
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { simpleRegressionMethods,simpleRegressionResponse } from '../../../Methods/regressionMethods/simpleRegression';
import { BlockMath } from 'react-katex';
import { MatrixFormat,ArrayFormat,AarrayFormat } from '../../ui/MatrixFormat';
import TableXY from '../../ui/TableXY';
import GraphScale from '../../ui/GraphScale';

interface Values {
    x: number[]; 
    points: { x: number; y: number; selected: boolean; }[]; 
    M: number; 
}


function SimpleRegression() {

    const { setloadingSecond } = useContext(MyFunctionContext);
    const [Result, setResult] = useState<simpleRegressionResponse | null>(null);
    const [Data , setData] = useState<Values>({x: [], points: [], M: 1});


    const getValues = (value : Values) => {
        const points = value.points.map(point => {
          return {
            x: Number(point.x),
            y: Number(point.y),
            selected: Boolean(point.selected)
          }
        });
        const x = value.x?.map(x => Number(x));
        const M = Number(value.M);
        setData(
            {
                x,
                points,
                M
            }
            
        )
      }

      const sendRequest = async () => {
        setloadingSecond(true);
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(simpleRegressionMethods(Data.M, Data.x, Data.points));
          }, 1000);
        })
          .then((result: unknown) => {
            const simpleRegressionResponse = result as simpleRegressionResponse;
            if (simpleRegressionResponse.statusCode === 200) {
              setResult(simpleRegressionResponse);
              Swal.fire({
                title: "Success!",
                text: "Your have been success.",
                icon: "success",
              });
            } else {
              setResult(null);
              Swal.fire({
                title: "Error!",
                text: simpleRegressionResponse.error,
                icon: "error",
              });
              console.error("Error loading data:", simpleRegressionResponse.error);
            }
            setloadingSecond(false);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "An error occured while processing your request.",
              icon: "error",
            });
            console.error("Error loading data:", error);
            setloadingSecond(false);
          });
      };

      const renderSolution = () =>{
        return (
            (Result &&
            <div className='w-full flex flex-col justify-center items-center gap-3'>
                <div className='flex flex-wrap'>
                    <BlockMath math='f(x) = \kern{3px}'/>
                    {Result?.arrA.map((_,index) => {
                        return (
                            <BlockMath key={index} math={`${index != 0 ? `\\kern{3px} + ` : ``} \\kern{3px} a_{${index}} ${index != 0 ? `\\kern{3px} x^${index}` : ``}`}/>
                        )
                    })}
                </div>
                <div className='flex flex-wrap gap-3 justify-center items-center'>
                    <BlockMath math={MatrixFormat(Result?.martrixX)}/>
                    <BlockMath math={AarrayFormat(Result?.martrixX[0])}/>
                    <BlockMath math={`\\kern{3px} = ${ArrayFormat(Result?.arrY)}`}/>
                </div>

                <div className='flex flex-wrap'>
                    <BlockMath math='f(x) = \kern{3px}'/>
                    {Result?.arrA.map((value,index) => {
                        return (
                            <BlockMath key={index} math={`${index != 0 ? `\\kern{3px} + ` : ``} \\kern{3px} ${value} ${index != 0 ? `\\kern{3px} x^${index}` : ``}`}/>
                        )
                    })}
                </div>

                <div className='flex flex-col flex-wrap'>
                    {Result?.result.map((value,index) => {
                        return (
                            <BlockMath key={index} math={`f(${Data.x[index]}) = \\color{red} ${value}`}/>
                        )
                    })}
                </div>


            </div>
            )
        )

      }

      const renderTable = () =>{
            const data = Result?.iterations.map((item) => {
                return {
                  x: item.x,
                  y: item.y
                }
              });
              return (
                data ? <TableXY data={{ iterations: data }} /> : null
              )
      }


      
      const renderGraph = () =>{
        const points : {x : number , y : number }[] = Data.points.filter((point) => point.selected).map((point) => {
            return {
              x: point.x,
              y: point.y
            }
          })
          const data = Result?.iterations.map((item) => {
            return {
              x: item.x,
              y: item.y
            }
          })

          const calY = (x : number) => {
            let y = 0;
            Result?.arrA.forEach((a,index) => {
                y += a * Math.pow(x,index);
            })
            return y;
          }
          const mainGraph = new Array<{x : number , y : number}>();
          for (let i = Math.min(...points.map((num)=> num.x)) ; i <= Math.max(...points.map((num)=> num.x)); i += 0.1){
              mainGraph.push({x: i, y: calY(i)});
          }

          const plotly = [
            {
              x: mainGraph.map((item) => item.x),
              y: mainGraph.map((item) => item.y),
              mode: 'lines',
              line: {
                color: '#4db5ff',
                shape: 'spline',
                width: 2,
              },
              name: 'Regression Line',
            },
            ...(data ?? []).map((item,index) => {
              return {
                  x: [item.x],
                  y: [item.y],
                  mode: 'markers',
                  name: `Result (x${index+1},y${index+1})`,
                  marker: {
                  color: '#7b00ff',
                  size: 10,
                  },
              }
              }),
              ...(points ?? []).map((item) => {
                return {
                    x: [item.x],
                    y: [item.y],
                    mode: 'markers',
                    name: `POINTS (${item.x},${item.y})`,
                    marker: {
                    color: 'red',
                    size: 10,
                    },
                }
                }),
          ]
          
          return (
            <GraphScale DataGraph={plotly}/>
          )

      }
      
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <InputSimpleRegression getValues={getValues}/>
        <button
        className="min-[340px]:w-[250px] lg:w-[200px] mt-5 p-2 bg-secondary rounded-lg hover:scale-105 duration-300"
        onClick={sendRequest}
      >
        Calculate!
      </button>

      <div className="w-full h-content flex flex-col gap-5 mt-10">
        <h1 className="text-xl font-semibold">Simple Regression</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-center items-center p-5 ${Result ? '' : 'bg-background'}`}
        >
            {Result ? 
                
                <div role="tablist" className="tabs tabs-lifted w-full">
                <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#16232e] " aria-label="Solution" defaultChecked />
                <div role="tabpanel" className="tab-content bg-background rounded-box">
                {renderSolution()}
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#16232e]" aria-label="Table" />
                <div role="tabpanel" className="tab-content bg-background rounded-box">
                {renderTable()}
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#16232e]" aria-label="Graph" />
                <div role="tabpanel" className="tab-content bg-background rounded-box">
                {renderGraph()}
                </div>
          </div>
            
            : 
             <div className="font-semibold">Please Enter Points and xValue</div>
            }
        </div>
      </div>
    </div>
  )
}

export default SimpleRegression