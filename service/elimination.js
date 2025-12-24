export function solveGaussian(matrix) {
    // Converting all values are numbers
    let steps = matrix.map(row => 
        row.map(value => {
            const num = parseFloat(value);
            return isNaN(num) ? 0 : num;
        })
    );
    
    console.log("Original matrix:");
    steps.forEach(row => {
        const formattedRow = row.map(x => {
            // Check if it's a number before using toFixed
            if (typeof x === 'number' && !isNaN(x)) {
                return Number(x.toFixed(3));
            }
            return x; // Return as-is if not a number
        });
        console.log(formattedRow);
    });
    
    const numRows = steps.length;
    const numCols = steps[0].length;
    
    // Forward elimination
    for (let pivotRow = 0; pivotRow < Math.min(numRows, numCols - 1); pivotRow++) {
        // Find pivot with largest absolute value
        let maxRow = pivotRow;
        let maxVal = Math.abs(steps[pivotRow][pivotRow]);
        
        for (let row = pivotRow + 1; row < numRows; row++) {
            const currentVal = Math.abs(steps[row][pivotRow]);
            if (currentVal > maxVal) {
                maxVal = currentVal;
                maxRow = row;
            }
        }
        
        // Swap rows if needed
        if (maxRow !== pivotRow) {
            [steps[pivotRow], steps[maxRow]] = [steps[maxRow], steps[pivotRow]];
            console.log(`Swapped row ${pivotRow} with row ${maxRow}`);
        }
        
        // Skip if pivot is nearly zero
        if (Math.abs(steps[pivotRow][pivotRow]) < 1e-10) {
            console.log(`Pivot at row ${pivotRow}, column ${pivotRow} is nearly zero`);
            continue;
        }
        
        // Normalize pivot row to make pivot = 1
        const pivot = steps[pivotRow][pivotRow];
        if (Math.abs(pivot - 1) > 1e-10) {
            for (let col = pivotRow; col < numCols; col++) {
                steps[pivotRow][col] /= pivot;
            }
            console.log(`Normalized row ${pivotRow}`);
        }
        
        // Eliminate below pivot
        for (let row = pivotRow + 1; row < numRows; row++) {
            const factor = steps[row][pivotRow];
            if (Math.abs(factor) > 1e-10) {
                for (let col = pivotRow; col < numCols; col++) {
                    steps[row][col] -= factor * steps[pivotRow][col];
                }
            }
        }
        
        console.log(`After column ${pivotRow}:`);
        steps.forEach((row, idx) => {
            const formatted = row.map(x => {
                if (typeof x === 'number' && !isNaN(x)) {
                    // Format with 3 decimal places, remove trailing zeros
                    const fixed = x.toFixed(3);
                    return parseFloat(fixed);
                }
                return x;
            });
            console.log(`Row ${idx}:`, formatted);
        });
        console.log("---");
    }
    
    // Back substitution
    const solutions = new Array(numRows).fill(0);
    
    for (let row = numRows - 1; row >= 0; row--) {
        let col = row;
        
        // Find the first non-zero coefficient in this row
        while (col < numCols - 1 && Math.abs(steps[row][col]) < 1e-10) {
            col++;
        }
        
        if (col === numCols - 1) {
            // Check for inconsistency: 0 = non-zero constant
            if (Math.abs(steps[row][numCols - 1]) > 1e-10) {
                return {
                    steps: steps,
                    solutions: null,
                    message: "No solution (inconsistent system)"
                };
            }
            continue; // Free variable or zero row
        }
        
        // Calculate solution
        let sum = steps[row][numCols - 1];
        for (let j = col + 1; j < numCols - 1; j++) {
            sum -= steps[row][j] * solutions[j];
        }
        solutions[col] = sum / steps[row][col];
    }
    
    console.log("Final row-echelon form:");
    steps.forEach(row => {
        const formatted = row.map(x => {
            if (typeof x === 'number') {
                // Round to 4 decimal places
                return Math.round(x * 10000) / 10000;
            }
            return x;
        });
        console.log(formatted);
    });
    
    const roundedSolutions = solutions.map(x => 
        typeof x === 'number' ? Math.round(x * 10000) / 10000 : x
    );
    
    console.log("Solutions:", roundedSolutions);
    
    return {
        steps: steps,
        solutions: roundedSolutions,
        type: "unique"
    };
}