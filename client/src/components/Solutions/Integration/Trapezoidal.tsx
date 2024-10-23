import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

interface Values {
  a: number;
  b: number;
  equation: string;
  n?: number;
}

function Trapezoidal() {
  const [Data] = useOutletContext<[Values]>();

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  

  return (
    <div></div>
  )
}

export default Trapezoidal;