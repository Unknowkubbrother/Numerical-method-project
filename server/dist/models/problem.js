"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProblemBySolution = exports.deleteProblemById = exports.deleteProblemByType = exports.deleteProblems = exports.updateProblem = exports.getProblemById = exports.getProblems = exports.getProblemsByType = exports.getProblem = exports.createProblem = exports.Problem = exports.SolutionType = exports.ProblemType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var ProblemType;
(function (ProblemType) {
    ProblemType["ROOT_OF_EQUATION"] = "Root of Equation";
    ProblemType["LINEAR_ALGEBRAIC_EQUATION"] = "Linear Algebraic Equation";
    ProblemType["INTERPOLATION"] = "Interpolation";
    ProblemType["REGRESSION"] = "Regression";
    ProblemType["INTEGRATION"] = "Integration";
    ProblemType["DIFFERENTIATION"] = "Differentiation";
})(ProblemType || (exports.ProblemType = ProblemType = {}));
var SolutionType;
(function (SolutionType) {
    SolutionType["GRAPHICAL"] = "graphical";
    SolutionType["BISECTION"] = "bisection";
    SolutionType["FALSE_POSITION"] = "falseposition";
    SolutionType["ONEPOINT"] = "onepoint";
    SolutionType["NEWTON"] = "newton";
    SolutionType["SECANT"] = "secant";
    SolutionType["CRAMER"] = "cramer";
    SolutionType["GAUSS_ELIMINATION"] = "gausselimination";
    SolutionType["GAUSS_JORDAN"] = "gaussjordan";
    SolutionType["MATRIX_INVERSE"] = "matrixinverse";
    SolutionType["LU_DECOMPOSITION"] = "ludecomposition";
    SolutionType["CHOLESKY_DECOMPOSITION"] = "choleskydecomposition";
    SolutionType["JACOBI"] = "jacobi";
    SolutionType["GAUSS_SEIDEL"] = "gaussseidel";
    SolutionType["CONJUGATE"] = "conjugate";
    SolutionType["NEWTON_DIVIDED"] = "newtondivided";
    SolutionType["LAGRANGE"] = "lagrange";
    SolutionType["SPLINE"] = "spline";
    SolutionType["SIMPLEREGRESSION"] = "simple";
    SolutionType["MULTIPLELINEARREGRESSION"] = "multipleLinear";
    SolutionType["TRAPEZOIDAL"] = "trapezoidal";
    SolutionType["COMPOSITETRAPEZOIDAL"] = "compositetrapezoidal";
    SolutionType["SIMPSON"] = "simpson";
    SolutionType["COMPOSITESIMPSON"] = "compositesimpson";
    SolutionType["DIFF"] = "diff";
})(SolutionType || (exports.SolutionType = SolutionType = {}));
const ProblemSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: Object.values(ProblemType),
        required: true,
    },
    solution: {
        type: String,
        enum: Object.values(SolutionType),
        required: true,
    },
    input: { type: Object, required: true },
    output: { type: Object, required: false, select: false },
    createdAt: { type: Date, default: Date.now },
});
exports.Problem = mongoose_1.default.model('problems', ProblemSchema);
const createProblem = (values) => new exports.Problem(values).save().then((problem) => problem.toObject());
exports.createProblem = createProblem;
const getProblem = (input, type, solution) => exports.Problem.findOne({
    input: { $eq: input },
    type: type,
    solution: solution,
});
exports.getProblem = getProblem;
const getProblemsByType = (type) => exports.Problem.find({ type: type });
exports.getProblemsByType = getProblemsByType;
const getProblems = () => exports.Problem.find();
exports.getProblems = getProblems;
const getProblemById = (id) => exports.Problem.findById(id);
exports.getProblemById = getProblemById;
const updateProblem = (id, values) => exports.Problem.findByIdAndUpdate(id, values);
exports.updateProblem = updateProblem;
const deleteProblems = () => exports.Problem.deleteMany({});
exports.deleteProblems = deleteProblems;
const deleteProblemByType = (type) => exports.Problem.deleteMany({ type: type });
exports.deleteProblemByType = deleteProblemByType;
const deleteProblemById = (id) => exports.Problem.findByIdAndDelete(id);
exports.deleteProblemById = deleteProblemById;
const deleteProblemBySolution = (solution) => exports.Problem.deleteMany({ solution: solution });
exports.deleteProblemBySolution = deleteProblemBySolution;
//# sourceMappingURL=problem.js.map