
for(let i=0 ; i<rows ; i++) {
    for(let j=0 ; j<cols ; j++) {
        let cell=document.querySelector(`.empty-cell[rid='${i}'][cid='${j}']`);
        cell.addEventListener("blur" , ()=>{
            let address= addBar.value;
            let [activeC, cellProp ] = activeCell(address);

            cellProp.value= activeC.innerText;
            console.log(cellProp.value);
        })
    }
}

let formula= document.querySelector(".formula-bar");
// console.log(formula.childElementCount);

formula.addEventListener("keydown" , (e)=>{
    let formulaVal= formula.value;
    if(e.key=="Enter" && formulaVal){
        let evalVal= formulaEvaluation(formulaVal);
        setCellValues(evalVal,formulaVal);
    }
})

//evaluate formula
function formulaEvaluation(exp){
    let formulaExp=exp.split("");
    for(let i=0 ; i<formulaExp.length && formulaExp[i].length>=1 ;i++){
        let asciiVal=formulaExp[i].charCodeAt(0);
        if (asciiVal<=90 && asciiVal>=65){
            //to get cell props using address Bar
            let str=formulaExp[i]+formulaExp[i+1];
            let [cell,cellProp]= activeCell(str);
            formulaExp[i]=cellProp.value;
            formulaExp[i+1]="";
        } 
    }
    let decoded=formulaExp.join("");
    return eval(decoded);
}

function setCellValues(evalVal,expression){
    let address=addBar.value;
    let [cell, cellProp] = activeCell(address);

    //change text
    cell.innerText=evalVal; 

    //change data in database
    cellProp.value=evalVal;
    cellProp.formula=expression;
}