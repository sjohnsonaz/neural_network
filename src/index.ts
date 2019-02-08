import Matrix from './Matrix';

window.onload = () => {
    let program = new Program();
    (window as any)['program'] = program;
    console.log('started');
    program.testAddition();
    program.testDotProduct();
}

class Program {
    testAddition() {
        let a = new Matrix(10, 10, 1);
        let b = new Matrix(10, 10, 2);
        let result = Matrix.add(a, b);
        console.log(result);
    }
    testDotProduct() {
        let a = Matrix.create([
            [0, 1, 2],
            [3, 4, 5]
        ]);
        let b = Matrix.create([
            [6, 7],
            [8, 9],
            [10, 11]
        ]);
        let result = Matrix.dot(a, b);
        console.log(result);
    }
}