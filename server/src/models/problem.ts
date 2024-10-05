import mongoose from "mongoose";
import lodash from 'lodash';

export enum ProblemType {
    ROOT_OF_EQUATION = "Root of Equation",
    LINEAR_ALGEBRAIC_EQUATION = "Linear Algebraic Equation",
    INTERPOLATION = "Interpolation",
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
}

interface IProblem {
    type: ProblemType;
    solution: SolutionType;
    input: object;
    output?: object;
}

const ProblemSchema = new mongoose.Schema({
    problem: {
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
        output: { type: Object, required: false },
    },
    createdAt: { type: Date, default: Date.now },
});

export const Problem = mongoose.model('problems', ProblemSchema);

export const createProblem = (values: { problem: IProblem }) =>
    new Problem(values).save().then((problem) => problem.toObject());

export const getProblem = async (input: object, type: string, solution: string) => {
    const problem = await Problem.findOne({
        "problem.type": type,
        "problem.solution": solution
    });

    if (problem && lodash.isEqual(lodash.toPlainObject(problem).problem.input, input)) {
        return problem.toObject();
    }

    return null;
}