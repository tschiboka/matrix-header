// create matrix table cells arg1 row number, arg2 cell num and render random letters to them
function createMatrix(row,col,tableId) {        
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?<>-()*",
          randomLetter = () => letters[Math.floor(Math.random()*letters.length)],
          cellSize = Math.floor(window.getComputedStyle(document.getElementsByTagName("header")[0],null).width.match(/\d+/)[0] / col); 
    let tableBody = document.createElement("tbody");
    for (r = 0; r < row; r++) {
        let tableRow = document.createElement("tr");
        for (c = 0; c < col; c++) {
            let tableCell = document.createElement("td");
            tableCell.id = `cell${r}_${c}`; // eg.: cell1_5; starts 0 so it won't collide with arrays later            
            tableCell.innerHTML = randomLetter();                                    
            tableCell.style.width = cellSize + "px"; // responsive size settings    
            tableRow.appendChild(tableCell);            
        } // end of inner for
        tableBody.appendChild(tableRow);    
    } // end of outer for    
    document.getElementById(tableId).appendChild(tableBody);    
} // end of createMatrix