export const hasUndefinedMatrix = (matrix: number[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === undefined) {
                return true;
            }
        }
    }
    return false;
};

export const hasUndefinedArr = (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
            return true;
        }
    }
    return false;
}