let sheetDB= [];

//rows in other file
for(let i=0 ; i<=rows ; i++) {
    let sheetRow=[];
    for(let j=0 ; j<=cols ; j++) {
        let cellProp ={
            bold:false,
            italic:false,
            underline:false,
            alignment:"left",
            fontFamily:"monospace",
            fontSize: "15",
            fontColor: "#000000", 
            BGColor : "#ffffff"
        }

        sheetRow.push(cellProp);
        }
    sheetDB.push(sheetRow);
}

//selectors fr cell properties
let bold =document.querySelector(".bold");
let italic =document.querySelector(".italic");
let underline =document.querySelector(".underline");
let fontSize =document.querySelector(".font-size-prop");
let fontFamily =document.querySelector(".font-family-prop");
let fontColor =document.querySelector(".font-color-prop");
let BGColor =document.querySelector(".back-color-prop");
let alignment =document.querySelectorAll(".alignment");

let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];

let activeColorProp= "#d1d8e0";
let inactiveColorProp= "#ecf0f1";


//event listners
//application of 2 way binding
bold.addEventListener("click" , ()=>{
    let address = addBar.value;
    let [cell,cellProp] =activeCell(address);

    //modification
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight= cellProp.bold ? "bold" : "normal";
    
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; 
});

italic.addEventListener("click" , ()=>{
    let address = addBar.value;
    let [cell,cellProp] =activeCell(address);

    //modification
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle= cellProp.italic ? "italic" : "normal";
    
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; 
});

underline.addEventListener("click" , ()=>{
    let address = addBar.value;
    let [cell,cellProp] =activeCell(address);

    //modification
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration= cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; 
});


fontSize.addEventListener("change" , ()=>{
    let address = addBar.value;
    let [cell,cellProp] =activeCell(address);
     
    cellProp.fontSize= fontSize.value;
    cell.style.fontSize =cellProp.fontSize + "px";
    fontSize.value =cellProp.fontSize;
});

fontFamily.addEventListener("change" , ()=>{
    let address = addBar.value;
    let [cell,cellProp] =activeCell(address);
     
    cellProp.fontFamily= fontFamily.value;
    cell.style.fontFamily =cellProp.fontFamily ;
    fontFamily.value =cellProp.fontFamily;
});

fontColor.addEventListener("change" , ()=>{
    let address = addBar.value;
    let [cell,cellProp] =activeCell(address);
     
    cellProp.fontColor= fontColor.value;
    cell.style.color =cellProp.fontColor ;
    fontColor.value =cellProp.fontColor;
});

BGColor.addEventListener("change" , ()=>{
    let address = addBar.value;
    let [cell,cellProp] =activeCell(address);
     
    cellProp.BGColor= BGColor.value;
    cell.style.backgroundColor =cellProp.BGColor ;
    BGColor.value =cellProp.BGColor;
});

alignment.forEach((alignelem)=>{
    alignelem.addEventListener("click" ,(e)=>{
        let address = addBar.value;
        let [cell,cellProp] =activeCell(address);
        let alignValue = e.target.classList[0]; //as we intentionally put left center right there
        cellProp.alignment =alignValue;
        cell.style.textAlign =cellProp.alignment;
        
        switch (alignValue) {
            case "left": 
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":          
            leftAlign.style.backgroundColor=inactiveColorProp;
            centerAlign.style.backgroundColor=activeColorProp;
            rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
            default:
                break;
        }
    })
})

let allCell=document.querySelectorAll(".empty-cell");
for (let i=0 ; i<allCell.length; i++){
    addListnerCellProp(allCell[i]);
}


function addListnerCellProp(cell){
    cell.addEventListener("click", ()=>{
        let address= addBar.value;
        let [rid,cid]=decodeAdd(address);
        let cellProp =sheetDB[rid][cid];
        //copy from above styles value
        cell.style.fontWeight= cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle= cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration= cellProp.underline ? "underline" : "none";
        cell.style.fontSize =cellProp.fontSize + "px";
        cell.style.fontFamily =cellProp.fontFamily ;
        cell.style.color =cellProp.fontColor ;
        cell.style.backgroundColor =cellProp.BGColor ;
        cell.style.textAlign =cellProp.alignment;
        

        //apply ui props active inactive
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; 
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; 
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; 
        fontColor.value =cellProp.fontColor;
        fontSize.value =cellProp.fontSize;
        fontFamily.value =cellProp.fontFamily;
        BGColor.value =cellProp.BGColor;
        switch (cellProp.alignment) {
            case "left": 
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":          
            leftAlign.style.backgroundColor=inactiveColorProp;
            centerAlign.style.backgroundColor=activeColorProp;
            rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
            default:
                break;
        }
    })
}


function activeCell(address){
    let [rid,cid]=decodeAdd(address);
    let cell = document.querySelector(`.empty-cell[rid='${rid}'][cid='${cid}']`);
    let cellProp= sheetDB[rid][cid];
    return [cell,cellProp];
}
function decodeAdd(address){
    let rid= Number(address.slice(1))-1;
    let cid= Number(address.slice(0,1).charCodeAt(0))-65;
    return [rid,cid];
}
