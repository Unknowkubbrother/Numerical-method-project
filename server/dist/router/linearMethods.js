"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LinearAlgebraicEquation_1 = require("../controllers/LinearAlgebraicEquation");
exports.default = (router) => {
    router.post('/linear/cramer', LinearAlgebraicEquation_1.cramer);
    router.post('/linear/gaussElimination', LinearAlgebraicEquation_1.gaussElimination);
    router.post('/linear/gaussJordan', LinearAlgebraicEquation_1.gaussJordan);
    router.post('/linear/matrixInversion', LinearAlgebraicEquation_1.matrixInversion);
    router.post('/linear/ludecomposition', LinearAlgebraicEquation_1.ludecomposition);
    router.post('/linear/choleskydecomposition', LinearAlgebraicEquation_1.choleskydecomposition);
    router.post('/linear/jacobi', LinearAlgebraicEquation_1.jacobi);
    router.post('/linear/guassseidel', LinearAlgebraicEquation_1.guassseidel);
    router.post('/linear/conjugate', LinearAlgebraicEquation_1.conjugate);
};
//# sourceMappingURL=linearMethods.js.map