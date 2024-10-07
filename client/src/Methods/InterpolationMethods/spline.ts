import {problemCreate} from '../../Api/problem';

export interface SplineRequest {
    x: number[],
    points: {
        x:number,
        y:number,
        selected: boolean
    }[]
    type: string
}

export interface SplineResponse {
    result: {
        Xi: number;
        iteration: SplineIterationData;
        result: number
    }[];
    iterations: SplineIterationData[];
    error?: string;
    statusCode: number;
}

interface SplineIterationData {
    fx: number;
    m: number;
    offset: number;
    slope : {
        xi: number;
        xi1: number;
    };
}


export function SplineMethods( x:number[], points: {x:number, y:number , selected : boolean}[], type : string) : SplineResponse{

    const result: SplineResponse = { 
        result: [],
        iterations: [],
        statusCode: 400
    };

    if (points.filter((point) => point.selected).length < 2) {
        result.error = "You must select at least 2 points";
        return result;
    }
    
    const selectedPoints = points.filter((point) => point.selected);

    const maxSelectedPointsX = () => {
        let max = selectedPoints[0].x;
        for(let i=1;i<selectedPoints.length;i++){
            if(selectedPoints[i].x > max){
                max = selectedPoints[i].x;
            }
        }
        return max;
    };

    const minSelectedPointsX = () => {
        let min = selectedPoints[0].x;
        for(let i=1;i<selectedPoints.length;i++){
            if(selectedPoints[i].x < min){
                min = selectedPoints[i].x;
            }
        }
        return min;
    }

    if (type == "linear") {

        for(let xi=0;xi<x.length;xi++){
            if (x[xi] < minSelectedPointsX() || x[xi] > maxSelectedPointsX()) {
                result.error = "X value out of range";
                return result;
            }
        }

        const fx = ( xValue: number) : number => {
            for(let i=1 ; i < points.length ; i++){
                if (xValue >= points[i-1].x && xValue <= points[i].x) {
                    return i-1;
                }
            }
            return -1;
        }

        for(let i = 1 ; i < selectedPoints.length; i++){
            const fx = selectedPoints[i-1].y
            const m = (selectedPoints[i].y - selectedPoints[i-1].y) / (selectedPoints[i].x - selectedPoints[i-1].x);
            const offset  = selectedPoints[i-1].x;

            result.iterations.push({
                fx: fx,
                m: m,
                offset: offset,
                slope: {
                    xi: selectedPoints[i-1].x,
                    xi1: selectedPoints[i].x
                }
            });
        }

        for(let xi=0;xi<x.length;xi++){
            const resultindexAt : number = fx(x[xi]);
            result.result.push({
                Xi: x[xi],
                iteration: result.iterations[resultindexAt],
                result: result.iterations[resultindexAt].m * (x[xi] - result.iterations[resultindexAt].offset) + result.iterations[resultindexAt].fx
            });
        }
    }

    result.statusCode = 200;

    problemCreate({
        type: "Interpolation",
        solution: "spline",
        input: {
            "x" : x,
            "points" : points,
            "type" : type
        },
        output: result
        
    });

    return result;

}

// {
//     "x": 4.5, 
//     "points": [
//         {"x": 2, "y": 9.5},
//         {"x": 4, "y": 8.0},
//         {"x": 6, "y": 10.5},
//         {"x": 8, "y": 39.5},
//         {"x": 10, "y": 72.5}
//     ],
//     "type": "linear"
// }

