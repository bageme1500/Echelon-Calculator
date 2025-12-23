export function solveGaussian(matrix){
    let steps = [...matrix]; // Create a copy to avoid mutating original
    let boni = [];
    
    console.log("Original matrix:");
    steps.forEach(row => console.log(row));
    
    // Find the first row that has a leading 1
    let rowWithLeadingOne = -1;
    
    // Check each row for a leading 1
    for(let i = 0; i < 3; i++){
        // Check if this row starts with "1" (leading 1)
        if(steps[i][0] === "1") {
            console.log(`Found leading "1" at row ${i}, column 0`);
            rowWithLeadingOne = i;
            break;
        }
    }
    
    // If we found a row with leading 1 and it's not already the first row, swap it
    if(rowWithLeadingOne !== -1 && rowWithLeadingOne !== 0){
        // Swap the row with leading 1 to be the first row
        [steps[0], steps[rowWithLeadingOne]] = [steps[rowWithLeadingOne], steps[0]];
        console.log(`Swapped row 0 with row ${rowWithLeadingOne}`);
        console.log("Matrix after swap:");
        steps.forEach(row => console.log(row));
    } else if(rowWithLeadingOne === -1) {
        console.log("No row found with leading '1' in first column");
    }
    
    return steps;
}