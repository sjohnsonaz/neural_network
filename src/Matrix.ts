export default class Matrix {
    lengthX: number;
    lengthY: number;
    value: number[][];

    constructor(lengthX: number, lengthY: number, initialValue?: number | number[][]) {
        this.lengthX = lengthX;
        this.lengthY = lengthY;
        this.value = new Array(lengthX);
        switch (typeof initialValue) {
            case 'number':
                for (let x = 0; x < lengthX; x++) {
                    let yArray = new Array(lengthY);
                    yArray.fill(initialValue);
                    this.value[x] = yArray;
                }
                break;
            case 'object':
                for (let x = 0; x < lengthX; x++) {
                    if (initialValue[x]) {
                        this.value[x] = Array.from(initialValue[x]);
                        if (this.value[x].length !== lengthY) {
                            this.value[x].length = lengthY;
                        }
                    } else {
                        this.value[x] = new Array(lengthY);
                    }
                }
                break;
            default:
                for (let x = 0; x < lengthX; x++) {
                    this.value[x] = new Array(lengthY);
                }
        }
    }

    store(array: number[][]) {
        let lengthX = array.length;
        let lengthY = array[0].length;
        this.lengthX = lengthX;
        this.lengthY = lengthY;
        this.value = new Array(lengthX);

        for (let x = 0; x < lengthX; x++) {
            if (array[x]) {
                this.value[x] = Array.from(array[x]);
                if (this.value[x].length !== lengthY) {
                    this.value[x].length = lengthY;
                }
            } else {
                this.value[x] = new Array(lengthY);
            }
        }
    }

    static create(array: number[][]) {
        return new Matrix(array.length, array[0].length, array);
    }

    static identity(size: number) {
        let matrix = new Matrix(size, size, 0);
        for (let x = 0; x < size; x++) {
            matrix.value[x][x] = 1;
        }
        return matrix;
    }

    static add(a: Matrix, b: Matrix, result?: Matrix) {
        if (a.lengthX !== b.lengthX || a.lengthY !== b.lengthY) {
            throw new Error(MatrixError.dimensionMismatch);
        }
        if (!result) {
            result = new Matrix(a.lengthX, a.lengthY);
        }
        for (let x = 0, lengthX = a.lengthX; x < lengthX; x++) {
            for (let y = 0, lengthY = a.lengthY; y < lengthY; y++) {
                result.value[x][y] = a.value[x][y] + b.value[x][y];
            }
        }
        return result;
    }

    static sub(a: Matrix, b: Matrix, result?: Matrix) {
        if (a.lengthX !== b.lengthX || a.lengthY !== b.lengthY) {
            throw new Error(MatrixError.dimensionMismatch);
        }
        if (!result) {
            result = new Matrix(a.lengthX, a.lengthY);
        }
        for (let x = 0, lengthX = a.lengthX; x < lengthX; x++) {
            for (let y = 0, lengthY = a.lengthY; y < lengthY; y++) {
                result.value[x][y] = a.value[x][y] - b.value[x][y];
            }
        }
        return result;
    }

    static mult(a: Matrix, b: number, result?: Matrix) {
        if (!result) {
            result = new Matrix(a.lengthX, a.lengthY);
        }
        for (let i = 0, lengthX = a.lengthX; i < lengthX; i++) {
            for (let j = 0, lengthY = a.lengthY; j < lengthY; j++) {
                result.value[i][j] = b * a.value[i][j];
            }
        }
        return result;
    }

    static multRow(a: Matrix, b: number, i: number, result?: Matrix) {
        if (!result) {
            result = Matrix.create(a.value);
        }
        for (let j = 0, lengthY = a.lengthY; j < lengthY; j++) {
            result.value[i][j] = b * a.value[i][j];
        }
        return result;
    }

    static multCol(a: Matrix, b: number, j: number, result?: Matrix) {
        if (!result) {
            result = Matrix.create(a.value);
        }
        for (let i = 0, lengthX = a.lengthX; i < lengthX; i++) {
            result.value[i][j] = b * a.value[i][j];
        }
        return result;
    }

    static dot(a: Matrix, b: Matrix, result?: Matrix) {
        if (a.lengthY !== b.lengthX) {
            throw new Error(MatrixError.dimensionMismatch);
        }
        if (!result) {
            result = new Matrix(Math.min(a.lengthX, b.lengthX), Math.min(a.lengthY, b.lengthY));
        }
        let lengthZ = a.lengthY;
        for (let i = 0, lengthX = a.lengthX; i < lengthX; i++) {
            for (let j = 0, lengthY = b.lengthY; j < lengthY; j++) {
                let value = 0;
                for (let z = 0; z < lengthZ; z++) {
                    value += a.value[i][z] * b.value[z][j];
                }
                result.value[i][j] = value;
            }
        }
        return result;
    }

    static swapRow(a: Matrix, i: number, j: number, result?: Matrix) {
        if (!result) {
            result = Matrix.create(a.value);
        }
        let row = a.value[i];
        result.value[i] = a.value[j];
        result.value[j] = row;
        return result;
    }

    static rref(a: Matrix, result?: Matrix) {
        if (!result) {
            result = Matrix.create(a.value);
        } else {
            result.store(a.value);
        }
    }
}

export enum MatrixError {
    dimensionMismatch = 'Matrices are of different dimensions'
}