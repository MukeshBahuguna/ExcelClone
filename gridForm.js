let rows=100;
let cols=26;

let addressColCont=document.querySelector(".address-col-cont");
let addressRowCont=document.querySelector(".address-row-cont");
let cellCont= document.querySelector(".cell-cont");
let addBar= document.querySelector(".address-bar");

for(let i=0 ; i<rows;i++){
    let cell= document.createElement("div");
    cell.setAttribute("class", "col-num");
    cell.innerText= i+1;
    addressColCont.appendChild(cell);
}

for(let i=0 ; i<cols;i++){
    let cell= document.createElement("div");
    cell.setAttribute("class", "row-character");
    cell.innerText= String.fromCharCode(i + 65) ;
    addressRowCont.appendChild(cell);
}

for(let i=0 ; i<rows ;i++){
    let tempCont= document.createElement("div");
    tempCont.setAttribute("class" , "empty-cell-cont");
    for(let j=0 ; j<cols ;j++){
        let cell= document.createElement("div");
        cell.setAttribute("class", "empty-cell");
        cell.setAttribute("contenteditable" ,"true");
        //for cell and storage identification
        cell.setAttribute("rid" ,i);
        cell.setAttribute("cid" ,j);
        tempCont.appendChild(cell);
        addressBarDisplay(cell,i,j);
    }
    cellCont.appendChild(tempCont);
}

function addressBarDisplay(cell,i,j){
    cell.addEventListener("click", () =>{
        let rowId = i+1;
        let colId= String.fromCharCode(j + 65) ;
        addBar.value= `${colId}${rowId}`;
    });
}
//to not get empty value start at cell 1 
let flag=true;
let firstcell = document.querySelector(".empty-cell");
if (flag) {
    firstcell.click();
    flag=false;
}