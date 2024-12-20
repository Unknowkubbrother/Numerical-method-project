"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemsGetbyId = exports.problemGetByType = exports.problemCreate = void 0;
const problem_1 = require("../models/problem");
const problemCreate = async (req, res) => {
    try {
        const { type, solution, input, output } = req.body;
        if (!type || !solution || !input) {
            return res.sendStatus(400);
        }
        const checkExist = await (0, problem_1.getProblem)(input, type, solution);
        if (checkExist) {
            return res.sendStatus(409);
        }
        const response = await (0, problem_1.createProblem)({
            type,
            solution,
            input,
            output
        });
        return res.status(201).json(response).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.problemCreate = problemCreate;
const problemGetByType = async (req, res) => {
    try {
        const { type } = req.body;
        const response = await (0, problem_1.getProblemsByType)(type).select('type solution input output.result createdAt');
        if (response) {
            return res.status(200).json(response).end();
        }
        return res.sendStatus(404);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.problemGetByType = problemGetByType;
const problemsGetbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, problem_1.getProblemById)(id);
        if (!response) {
            return res.sendStatus(404);
        }
        return res.status(200).json(response).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.problemsGetbyId = problemsGetbyId;
//# sourceMappingURL=problem.js.map