// App.js
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { ConjugateResponse } from "../../Methods/linearMethods/conjugate";
import { Matrix, matrix } from "mathjs";

interface Props {
  matrixA: number[][];
  arrB: number[];
}

function ConjugateGraph(props: {
  data: Props;
  type: string;
  result: ConjugateResponse | null;
}) {
  const [steps, setSteps] = useState<{ x: number; y: number; z: number }[]>([]);
  const calculateFx = (
    x: number,
    y: number,
    matrixA: number[][],
    arrB: number[]
  ) => {
    const a = matrixA[0][0];
    const b = matrixA[0][1];
    const c = matrixA[1][0];
    const d = matrixA[1][1];

    const e = arrB[0];
    const f = arrB[1];

    const result =
      0.5 * (x * (a * x + y * c) + y * (x * b + y * d)) - e * x - f * y;

    return result;
  };

  useEffect(() => {
    if (props.result) {
      setSteps(
        props.result?.iterations?.map((item) => {
          return {
            x: Number(matrix(item.x).toArray()[0]),
            y: Number(matrix(item.x).toArray()[1]),
            z: calculateFx(
              Number(matrix(item.x).toArray()[0]),
              Number(matrix(item.x).toArray()[1]),
              props.data.matrixA,
              props.data.arrB
            ),
          };
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.result]);

  const xValues = [...Array(100).keys()].map((i) => -10 + i * 0.2);
  const yValues = [...Array(100).keys()].map((i) => -10 + i * 0.2);
  const zValues = xValues.map((x) =>
    yValues.map((y) => calculateFx(x, y, props.data.matrixA, props.data.arrB))
  );


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkType = (): Partial<Plotly.Data | any>[] => {
    return [
      {
      x: steps.map((s) => s.x),
      y: steps.map((s) => s.y),
      z: steps.map((s) => s.z),
      mode: "lines+markers",
      type: props.type == "2D" ? "scatter" : "scatter3d",
      marker: {
        symbol: props.type == "2D" ? "arrow" : "circle-open-dot",
        size: props.type == "2D" ? 10 : 5,
        angleref: "previous",
        standoff: 3,
      },
      line: {
        color: "red",
        width: 2,
      },
      name: `Iterations`,
      },
      {
      x: [Number(matrix(props.result?.result?.x as Matrix).toArray()[0])],
      y: [Number(matrix(props.result?.result?.x as Matrix).toArray()[1])],
      z: [
        calculateFx(
        Number(matrix(props.result?.result?.x as Matrix).toArray()[0]),
        Number(matrix(props.result?.result?.x as Matrix).toArray()[1]),
        props.data.matrixA,
        props.data.arrB
        ),
      ],
      mode: "markers",
      type: props.type == "2D" ? "scatter" : "scatter3d",
      marker: {
        color: "#ffffff",
        size: 10,
      },
      name: "Final Result",
      },
    ];
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <Plot
        className="w-full h-full justify-center items-center"
        data={[
          {
            z: zValues,
            x: xValues,
            y: yValues,
            type: props.type == "2D" ? "contour" : "surface",
            colorscale: "Jet",
          },
          ...checkType(),
        ]}
        layout={{
          scene: {
            xaxis: { title: "X Axis" },
            yaxis: { title: "Y Axis" },
            zaxis: { title: "Z Axis" },
          },
          dragmode: props.type == "3D" ? "orbit" : "pan",
          margin: { t: 0, r: 0 },
          autosize: true,
        }}
        config={{
          scrollZoom: true,
        }}
      />
    </div>
  );
}

export default ConjugateGraph;
