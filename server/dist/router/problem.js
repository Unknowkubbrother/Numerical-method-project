"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const problem_1 = require("../controllers/problem");
exports.default = (router) => {
    router.post('/problem/create', problem_1.problemCreate);
    router.post('/problem/getByITS', problem_1.problemGetByITS); // input type solution
    router.post('/problem/getByType', problem_1.problemGetByType);
    router.get('/problem/getAll', problem_1.problemGetAll);
    router.post('/problem/:id', problem_1.problemsGetbyId);
};
//# sourceMappingURL=problem.js.map