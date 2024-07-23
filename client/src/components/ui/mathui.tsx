import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
// import { useLocation } from "react-router-dom";

function mathui({ equation }: { equation: string } ) {
  const replaceVariable = (equation: string) => {
    return location.pathname.split("/")[3] != "onepoint"
      ? equation.replace(/xi/g, `x{_i}`)
      : equation.replace(/x/g, `x{_i}`);
  };

  const MathEquation = ({ equation }: { equation: string }) => {
    const formattedEquation = replaceVariable(equation);

    return (
      <div>
        <BlockMath math={formattedEquation} />
      </div>
    );
  };

  return (
    <span className="font-semibold flex justify-center items-center gap-2">
      <span className="text-xl">
        {location.pathname.split("/")[3] != "onepoint" ? (
          <MathEquation equation={"f(x)"} />
        ) : (
          <MathEquation equation={"x_{n+1}"} />
        )}{" "}
      </span>{" "}
      =
      <span className="ml-2">
        {equation == "" ? ". . ." : <MathEquation equation={equation} />}
      </span>
    </span>
  );
}

export default mathui;
