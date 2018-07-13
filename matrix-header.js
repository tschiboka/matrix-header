/* Create matrix table cells arg1 row number, arg2 cell num and render random letters to them
   row : number of rows
   col : number of columns
   tableId : the <table> we want to render the cells to
   fixedText : takes a matrix as an argument [[row,col,textString],...]
   The function creates a global matrix var*/
function createMatrix(row,col,tableId,fixedText) {        
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?<>-()*",
          randomLetter = () => letters[Math.floor(Math.random()*letters.length)],
          findLetter = (curr,ind,str) => curr>=ind && curr<ind+str.length ? [str[curr-ind],!0] : [randomLetter(),!1],
          cellSize = Math.floor(window.getComputedStyle(document.getElementsByTagName("header")[0],null)
                         .width.match(/\d+/)[0] / col);          
    let tableBody = document.createElement("tbody");
    matrix = [];  // global

    for (r = 0; r < row; r++) {
        let tableRow = document.createElement("tr"), matrixRow=[];
        const fixed = () => fixedText.filter(e => e[0] == r).join("").split(","), f = fixed();          
        for (c = 0; c < col; c++) {
            let tableCell = document.createElement("td");
            tableCell.id = `cell${r}_${c}`; // eg.: cell1_5; starts 0 so it won't collide with arrays later            
            tableCell.innerHTML = !f[0] ? randomLetter() : findLetter(c,Number(f[1]),f[2])[0]; // only random if its not a prediefined row                                                
            tableCell.style.width = cellSize + "px"; // responsive size settings    
            tableRow.appendChild(tableCell);                                    
            matrixRow += findLetter(c,Number(f[1]),f[2])[1] ? tableCell.innerHTML[0] : ".";
        } // end of inner for
        tableBody.appendChild(tableRow);            
        matrix.push(matrixRow);
    } // end of outer for    
    document.getElementById(tableId).appendChild(tableBody);             
} // end of createMatrix

function headerStart() {
    let count = 0;
    var timer = setInterval(()=>{
        console.log(++count);
        if (count >= 10) clearTimeout(timer);
    },100);
} // end of headerStart