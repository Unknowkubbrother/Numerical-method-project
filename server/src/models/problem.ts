import mongoose from "mongoose";

export enum ProblemType {
    ROOT_OF_EQUATION = "Root of Equation",
    LINEAR_ALGEBRAIC_EQUATION = "Linear Algebraic Equation",
    INTERPOLATION = "Interpolation",
    REGRESSION = "Regression",
    INTEGRATION = "Integration",
    DIFFERENTIATION = "Differentiation",
}

export enum SolutionType {
    GRAPHICAL = "graphical",
    BISECTION = "bisection",
    FALSE_POSITION = "falseposition",
    ONEPOINT = "onepoint",
    NEWTON = "newton",
    SECANT = "secant",
    CRAMER = "cramer",
    GAUSS_ELIMINATION = "gausselimination",
    GAUSS_JORDAN = "gaussjordan",
    MATRIX_INVERSE = "matrixinverse",
    LU_DECOMPOSITION = "ludecomposition",
    CHOLESKY_DECOMPOSITION = "choleskydecomposition",
    JACOBI = "jacobi",
    GAUSS_SEIDEL = "gaussseidel",
    CONJUGATE = "conjugate",
    NEWTON_DIVIDED = "newtondivided",
    LAGRANGE = "lagrange",
    SPLINE = "spline",
    SIMPLEREGRESSION = "simple",
    MULTIPLELINEARREGRESSION = "multipleLinear",
    TRAPEZOIDAL = "trapezoidal",
    COMPOSITETRAPEZOIDAL = "compositetrapezoidal",
    SIMPSON = "simpson",
    COMPOSITESIMPSON = "compositesimpson",
    DIFF = "diff",
}

interface IProblem {
    type: ProblemType;
    solution: SolutionType;
    input: object;
    output?: object;
}

const ProblemSchema = new mongoose.Schema({
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
    output: { type: Object, required: false , select: false },
    createdAt: { type: Date, default: Date.now },
});

export const Problem = mongoose.model('problems', ProblemSchema);

export const createProblem = (values: IProblem) =>
    new Problem(values).save().then((problem) => problem.toObject());

export const getProblem = (input: object, type: string, solution: string) => Problem.findOne({
    input: { $eq: input },
    type: type,
    solution: solution,
});

export const getProblemsByType = (type: string) => Problem.find({ type: type })
export const getProblems = () => Problem.find();
export const getProblemById = (id :string) => Problem.findById(id);
export const updateProblem = (id : string , values : object) => Problem.findByIdAndUpdate(id, values);
export const deleteProblems = () => Problem.deleteMany({});
export const deleteProblemByType = (type : string) => Problem.deleteMany({ type: type });
export const deleteProblemById = (id : string) => Problem.findByIdAndDelete(id);
export const deleteProblemBySolution = (solution : string) => Problem.deleteMany({ solution: solution });