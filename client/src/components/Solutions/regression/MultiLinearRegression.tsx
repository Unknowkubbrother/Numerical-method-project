import { useState, useContext } from "react";
import InputMultiRegression from "../../ui/InputMultiRegression";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";
import { MatrixFormat, ArrayFormat, AarrayFormat } from "../../ui/MatrixFormat";
import {
  multipleLinearRegressionMethods,
  multipleLinearRegressionResponse,
} from "../../../Methods/regressionMethods/multiplelinearRegrssion";
import TableXY from "../../ui/TableXY";
import GraphScale from "../../ui/GraphScale";
interface Values {
  x: number[][];
  points: { x: number[]; y: number; selected: boolean }[];
}

function MultiLinearRegression() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  const [Result, setResult] = useState<multipleLinearRegressionResponse | null>(
    null
  );
  const [Data, setData] = useState<Values>({ x: [], points: [] });

  const getValues = (value: Values) => {
    const points = value.points.map((point) => {
      return {
        x: point.x.map(Number),
        y: Number(point.y),
        selected: Boolean(point.selected),
      };
    });
    const x = value.x?.map((subArray) => subArray.map((x) => Number(x)));
    setData({
      x,
      points,
    });
  };

  const sendRequest = async () => {
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(multipleLinearRegressionMethods(Data.x, Data.points));
      }, 1000);
    })
      .then((result: unknown) => {
        const multipleLinearRegressionResponse =
          result as multipleLinearRegressionResponse;
        if (multipleLinearRegressionResponse.statusCode === 200) {
          console.log(multipleLinearRegressionResponse);
          setResult(multipleLinearRegressionResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: multipleLinearRegressionResponse.error,
            icon: "error",
          });
          console.error(
            "Error loading data:",
            multipleLinearRegressionResponse.error
          );
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

  const renderSolution = () => {
    return (
      Result && (
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <div className="flex flex-wrap">
            <BlockMath math="f(x) = \kern{3px}" />
            {Result?.arrA.map((_, index) => {
              return (
                <BlockMath
                  key={index}
                  math={`${
                    index != 0 ? `\\kern{3px} + ` : ``
                  } \\kern{3px} a_{${index}} ${
                    index != 0 ? `\\kern{3px} x^${index}` : ``
                  }`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <BlockMath math={MatrixFormat(Result?.martrixX)} />
            <BlockMath math={AarrayFormat(Result?.martrixX[0])} />
            <BlockMath math={`\\kern{3px} = ${ArrayFormat(Result?.arrY)}`} />
          </div>

          <div className="flex flex-warp">
            <BlockMath
              math={`
                    ${Result?.arrA.map((value, index) => {
                      return `a_{${index}} = ${value}`;
                    })}
                  `}
            />
          </div>

          <div className="flex flex-wrap">
            <BlockMath math="f(x) = \kern{3px}" />
            {Result?.arrA.map((value, index) => {
              return (
                <BlockMath
                  key={index}
                  math={`${
                    index != 0 ? `\\kern{3px} + ` : ``
                  } \\kern{3px} ${value} ${
                    index != 0 ? `\\kern{3px} x^${index}` : ``
                  }`}
                />
              );
            })}
          </div>

          <div className="flex flex-col flex-wrap">
            {Result?.result.map((value, index) => {
              return (
                <BlockMath
                  key={index}
                  math={`f(${Data.x[index]}) = \\color{red} ${value}`}
                />
              );
            })}
          </div>
        </div>
      )
    );
  };

  const renderTable = () => {
    const data = Result?.iterations.map((item) => {
      return {
        x: item.x,
        y: item.y,
      };
    });
    return data ? <TableXY data={{ iterations: data }} /> : null;
  };

  const renderGraph = () => {
    const filterpoint: { x: number[]; y: number }[] = Data.points
      .filter((point) => point.selected)
      .map((point) => {
        return {
          x: point.x,
          y: point.y,
        };
      });

    const points : {
      x: number[];
      y: number[];
    }[] = [];

    for(let i = 0; i < filterpoint[0].x.length; i++){
      const xArray = [];
      const yArray = [];
      for (let j = 0; j < filterpoint.length; j++){
        xArray.push(filterpoint[j].x[i]);
        yArray.push(filterpoint[j].y);
      }
      points.push({
        x: xArray,
        y: yArray,
      })
    }

    const data = Result?.iterations.map((item) => {
      return item.x.map((x) => {
        return {
          x: x,
          y: item.y,
        };
      });
    });
    

    const line: {
      x: number[];
      y: number[];
    } = {
      x: [],
      y: [],
    };

    let max = Infinity;
    let min = -Infinity;
    filterpoint.forEach((point) => {
      point.x.forEach((x) => {
        max = Math.min(max, x);
        min = Math.max(min, x);
      });
    })

    let xRange = max - min;
    min -= xRange * 0.1;
    max += xRange * 0.1;
    xRange = max - min;

    //Linemain 
    if (Result) {
      let sumY = Result.arrA[0];
      for(let j = 1; j < Object.keys(Result.arrA).length; j++){
          sumY += Result.arrA[j] * min;
      }

      line.x.push(min);
      line.y.push(sumY);

      sumY = Result.arrA[0];
      for(let j = 1; j < Object.keys(Result.arrA).length; j++){
          sumY += Result.arrA[j] * max;
      }

      line.x.push(max);
      line.y.push(sumY);

    }


    const colors = [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "brown",
      "pink",
      "gray",
      "cyan",
      "magenta",
    ];
    
    const plotly = [
      {
        x: line.x,
        y: line.y,
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
            x: item.map((i) => i.x),
            y: item.map((i) => i.y),
            mode: 'markers',
            name: `Result (x${index+1},y${index+1})`,
            marker: {
            color: colors[(colors.length-index) % colors.length],
            size: 15,
            },
        }
        }),

        ...points.map((point, index) => {
            return {
              x: point.x,
              y: point.y,
              mode: 'markers',
              name: `X${index + 1}`,
              marker: {
              color: colors[index % colors.length],
              size: 10,
              },
          }
        })
        
      // ...points.flatMap((subArray, subArrayIdx) => {
      //   let isFirst = true;
    
      //   return subArray.map((item) => {
      //     const trace = {
      //       x: [item.x],
      //       y: [item.y],
      //       mode: "markers",
      //       name: `X${subArrayIdx + 1}`,
      //       marker: {
      //         color: colors[subArrayIdx % colors.length],
      //         size: 10,
      //       },
      //       showlegend: isFirst,
      //     };
    
      //     isFirst = false;
      //     return trace;
      //   });
      // }),
    ];
    
    return <GraphScale DataGraph={plotly} />;
    
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <InputMultiRegression getValues={getValues} />
      <button
        className="min-[340px]:w-[250px] lg:w-[200px] mt-5 p-2 bg-secondary rounded-lg hover:scale-105 duration-300"
        onClick={sendRequest}
      >
        Calculate!
      </button>

      <div className="w-full h-content flex flex-col gap-5 mt-10">
        <h1 className="text-xl font-semibold">Multiple Regression</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-center items-center p-5 ${
            Result ? "" : "bg-background"
          }`}
        >
          {Result ? (
            <div role="tablist" className="tabs tabs-lifted w-full">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab [--tab-bg:#16232e] "
                aria-label="Solution"
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content bg-background rounded-box"
              >
                {renderSolution()}
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab [--tab-bg:#16232e]"
                aria-label="Table"
              />
              <div
                role="tabpanel"
                className="tab-content bg-background rounded-box"
              >
                {renderTable()}
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab [--tab-bg:#16232e]"
                aria-label="Graph"
              />
              <div
                role="tabpanel"
                className="tab-content bg-background rounded-box"
              >
                {renderGraph()}
              </div>
            </div>
          ) : (
            <div className="font-semibold">Please Enter Points and xValue</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiLinearRegression;
