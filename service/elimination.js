export function solveGaussian(matrix){
    let steps = matrix;
    let leadingOneMatrix;
    
    for(let i=0; i<3; i++){
        if(steps[0][0]==="1"){
            leadingOneMatrix = steps;

            console.log(steps[0]); //first leading one
            break;
        }else if(steps[1][1]==="1"){
            [steps[0],steps[1]]=[steps[1],steps[0]]
            leadingOneMatrix = steps;

            console.log(steps[1]);
            break;

        }else if(steps[2][2]==="1"){
            [steps[0],steps[2]]=[steps[2],steps[0]]
            leadingOneMatrix = steps;
            console.log(steps[2]);
            break;
        }else{
            console.log("do some mathematical computations");
        }
        break;
    }


    // steps.forEach(row => {
    //     row.forEach((value,index)=>{
    //         console.log(typeof(value))
    //     })
        
    // });

    // steps.forEach((value,index)=>{
            
    //         console.log(value);
    //     //console.log(value[index]); 

    // });
    
    return leadingOneMatrix;
}
