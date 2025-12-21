export function solveGaussian(matrix){
    const steps = matrix;

    steps.forEach(row => {
        row.forEach((value,index)=>{
            console.log(typeof(value))
        })
        
    });

    console.log(steps)

    return steps;
}
