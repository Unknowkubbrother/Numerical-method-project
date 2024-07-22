import express from "express";
import math from "../lib/math";

interface playload {
  xStart: number;
  xEnd: number;
  func: string;
  errorFactor: number;
}

interface response {
  result: {
    x: number;
    y: number;
  };
  iter: number;
  iterations?: {
    x: number;
    y: number;
    error?: number;
  }[];
}

export const HW1 = async (req: express.Request, res: express.Response) => {
  try {
    // {
    //     "xStart" :  0,
    //     "xEnd":  10.0,
    //     "func": "43x - 180",
    //     "errorFactor": 0.000001
    // }

    let { xStart, xEnd, func, errorFactor }: playload = req.body;

    let result: response = {
      result: {
        x: 0,
        y: 0,
      },
      iter: 0,
      iterations: [],
    };

    const checkSign = (y: number) => y < 0;

    let x = xStart;
    let y;
    let tempY = math.evaluate(func, { x: Number(x) } as any);
    let step: number = 1;
    let oldX: number = 0;

    while (x <= xEnd) {
      y = math.evaluate(func, { x: Number(x) } as any);

      result.iter++;

      result.iterations.push({ x: x, y: y } as { x: number; y: number });

      // console.log(x,y)
 
      if (checkSign(y) != checkSign(tempY)) {
        xEnd = x;

        x = x - step;

        tempY = math.evaluate(func, { x: Number(x) } as any);

        step = Number(errorFactor);

        let error = math.abs(x - oldX);


        console.log(x,oldX,y,error)

        if (error == 0 || error < errorFactor) {
          break;
        }

        oldX = x;
      }

      x += step;

      
    }

    result.result = {
      x: result.iterations[result.iterations.length - 1].x,
      y: result.iterations[result.iterations.length - 1].y,
    };

    return res.status(200).json(result).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const HW2 = async (req: express.Request, res: express.Response) => {
  try {
    // {
    //     "xStart" :  1.5,
    //     "xEnd":  2.0,
    //     "func": "x^4 - 13",
    //     "errorFactor": 0.000001
    // }

    const { xStart, xEnd, func, errorFactor }: playload = req.body;

    let result: response = {
      result: {
        x: 0,
        y: 0,
      },
      iter: 0,
      iterations: [],
    };

    let xL: number = xStart;
    let xR: number = xEnd;
    let oldXm: number = 0;
    let xM: number;
    let funcM: number;

    while (true) {
      xM = (xL + xR) / 2;
      let error: number = math.abs(xM - oldXm);
      funcM = math.evaluate(func, { x: Number(xM) } as any);

      if (error == 0 || error < errorFactor) {
        break;
      }

      result.iter++;
      result.iterations.push({ x: Number(xM), y: funcM, error: error } as {
        x: number;
        y: number;
        error: number;
      });

      let funcR = math.evaluate(func, { x: Number(xR) } as any);

      if (funcM * funcR > 0) {
        xR = xM;
      } else {
        xL = xM;
      }

      oldXm = xM;
    }

    result.result = {
      x: result.iterations[result.iterations.length - 1].x,
      y: result.iterations[result.iterations.length - 1].y,
    };

    return res.status(200).json(result).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const HW3 = async (req: express.Request, res: express.Response) => {
  try {
    // {
    //     "xStart" : 0,
    //     "xEnd":  1000000,
    //     "x": 38,
    //     "n" : 2,
    //     "errorFactor": 0.000001
    // }

    const { xStart, xEnd, x, n, errorFactor } = req.body;

    let xL: number = xStart;
    let xR: number = xEnd;
    const func: string = "x^n - num";
    let result: number = 0;
    let oldXm: number = 0;
    let xM: number;
    let funcM: number;
    let iter: number = 0;

    const calFunc = (x: number, num: number, n: number) => {
      return math.evaluate(func, { x: x, n: n, num: num } as any);
    };

    while (true) {
      xM = (xL + xR) / 2;
      funcM = calFunc(xM, x, n);
      let error: number = math.abs(xM - oldXm);
      let funcR = calFunc(xR, x, n);


      if (funcM == 0 || error < Number(errorFactor)) {
        result = xM;
        break;
      }

      iter++;

      if (funcR * funcM > 0) {
        xR = xM;
      } else {
        xL = xM;
      }

      oldXm = xM;
    }

    return res
      .status(200)
      .json({
        result: Number(math.round(result, 4)),
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const HW5 = async (req: express.Request, res: express.Response) => {
  try {
    // {
    //     "xStart" :  1.5,
    //     "xEnd":  2,
    //     "func": "x^4 - 13",
    //     "errorFactor": 0.000001
    // }

    const { xStart, xEnd, func, errorFactor }: playload = req.body;

    let result: response = {
      result: {
        x: 0,
        y: 0,
      },
      iter: 0,
      iterations: [],
    };

    let xL: number = xStart;
    let xR: number = xEnd;
    let x1: number;
    let oldX1: number = 0;
    let funcX1: number;

    while (true) {
      let funcL: number = math.evaluate(func, { x: xL } as any);
      let funcR: number = math.evaluate(func, { x: xR } as any);
      x1 = (xL * funcR - xR * funcL) / (funcR - funcL);
      let error: number = math.abs(x1 - oldX1);
      funcX1 = math.evaluate(func, { x: x1 } as any);

      if (error == 0 || error < errorFactor) {
        break;
      }

      result.iter++;
      result.iterations.push({ x: x1, y: funcX1, error: error } as {
        x: number;
        y: number;
        error: number;
      });

      if (funcR * funcX1 > 0) {
        xR = x1;
      } else {
        xL = x1;
      }

      oldX1 = x1;
    }

    result.result = {
      x: result.iterations[result.iterations.length - 1].x,
      y: result.iterations[result.iterations.length - 1].y,
    };

    return res.status(200).json(result).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const HW6 = async (req: express.Request, res: express.Response) => {
  try {
    // {
    //     "xStart" : 0,
    //     "xEnd":  1000,
    //     "x": 38,
    //     "n" : 2,
    //     "errorFactor": 0.000001
    // }

    const {
      xStart,
      xEnd,
      x,
      n,
      errorFactor,
    }: {
      xStart: number;
      xEnd: number;
      x: number;
      n: number;
      errorFactor: number;
    } = req.body;

    let result: number = 0;
    let xL: number = xStart;
    let xR: number = xEnd;
    let oldX1: number = 0;
    let x1: number;
    let funcX1: number;
    let func: string = "x^n-num";
    let iter = 0;

    const calFunc = (x: number, num: number, n: number) => {
      return math.evaluate(func, { x: x, n: n, num: num } as any);
    };

    while (true) {
      let funcL: number = calFunc(xL, x, n);
      let funcR: number = calFunc(xR, x, n);
      x1 = (xL * funcR - xR * funcL) / (funcR - funcL);
      let error: number = math.abs(x1 - oldX1);
      funcX1 = calFunc(x1, x, n);


      if (error == 0 || error < Number(errorFactor)) {
        result = x1;
        break;
      }

      iter++;

      if (funcR * funcX1 > 0) {
        xR = x1;
      } else {
        xL = x1;
      }

      oldX1 = x1;
    }

    return res
      .status(200)
      .json({
        result: Number(math.round(result, 4)),
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const HwOnePoint = async (req: express.Request, res: express.Response) => {
    try{
      // {
      //     "xStart" :  0,
      //     "func": "x^2-7+x",
      //     "errorFactor": 0.000001
      // }

      const { xStart, func, errorFactor }: playload = req.body;

      let result: {
        result: {
          x: number| string;
          y: number | string;
          error?: number | string;
        };
        iter: number;
        iterations: {
          x: number | string;
          y: number | string;
          error?: number | string;
        }[];
      } = {
        result: {
          x: 0,
          y: 0,
        },
        iter: 0,
        iterations: [],
      };

      let x : number = xStart;
      let oldX : number;

      while (true){
          oldX = x;

          x = math.evaluate(func, { x: Number(oldX) } as any);

          result.iter++;

          let error = math.abs(x - oldX);

          if (x !== Infinity && x !== -Infinity) {
            result.iterations.push({ x: oldX, y: x ,error: error} as { x: number, y: number, error: number });
          }else{
            result.iterations.push({ x: "infinity", y: "infinity" ,error: "NaN" } as { x: string, y: string , error: string});
          }

          if (error == 0 || error < errorFactor || x == Infinity || x == -Infinity) {
            break;
          }

      }

      result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
      };
      

      return res.status(200).json(result).end();
        
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
