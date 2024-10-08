"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewtonDividedMethods = NewtonDividedMethods;
function NewtonDividedMethods(x, points) {
    const result = {
        result: 0,
        iterations: [],
        statusCode: 400
    };
    let C = points.map((point) => point.y);
    for (let i = 1; i < points.length; i++) {
        for (let j = points.length - 1; j >= i; j--) {
            C[j] = (C[j] - C[j - 1]) / (points[j].x - points[j - i].x);
        }
    }
    for (let i = 0; i < points.length; i++) {
        let sum = C[i];
        let MutiOfSubtract = [1];
        for (let j = 0; j < i; j++) {
            MutiOfSubtract.push(x - points[j].x);
            sum *= (x - points[j].x);
        }
        result.iterations.push({
            C: C[i],
            MutiOfSubtract: MutiOfSubtract,
            sum: sum
        });
        result.result += sum;
    }
    result.statusCode = 200;
    return result;
}
// {
//     "x": 46151, 
//     "points": [
//         {"x": 0, "y": 9.81},
//         {"x": 20000, "y": 9.7487},
//         {"x": 40000, "y": 9.6879},
//         {"x": 60000, "y": 9.6879},
//         {"x": 80000, "y": 9.5682},
//     ], 
// }
//# sourceMappingURL=NewtonDivided.js.map