/* Create matrix table cells arg1 row number, arg2 cell num and render random letters to them
   row : number of rows
   col : number of columns
   tableId : the <table> we want to render the cells to
   fixedText : takes a matrix as an argument [[row,col,textString],...]*/
function createMatrix(row,col,tableId,fixedText) {        
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?<>-()*",
          randomLetter = () => letters[Math.floor(Math.random()*letters.length)],
          findLetter = (curr,ind,str) => curr>=ind && curr<ind+str.length ? str[curr-ind] : randomLetter(),
          cellSize = Math.floor(window.getComputedStyle(document.getElementsByTagName("header")[0],null)
                         .width.match(/\d+/)[0] / col);           
    let tableBody = document.createElement("tbody");
    for (r = 0; r < row; r++) {
        let tableRow = document.createElement("tr");
        const fixed = () => fixedText.filter(e => e[0] == r).join("").split(","), f = fixed();          
        for (c = 0; c < col; c++) {
            let tableCell = document.createElement("td");
            tableCell.id = `cell${r}_${c}`; // eg.: cell1_5; starts 0 so it won't collide with arrays later            
            tableCell.innerHTML = !f[0] ? randomLetter() : findLetter(c,Number(f[1]),f[2]); // only random if its not a prediefined row            
            tableCell.style.width = cellSize + "px"; // responsive size settings    
            tableRow.appendChild(tableCell);            
        } // end of inner for
        tableBody.appendChild(tableRow);    
    } // end of outer for    
    document.getElementById(tableId).appendChild(tableBody);    
} // end of createMatrix