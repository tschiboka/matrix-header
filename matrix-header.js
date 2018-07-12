// create matrix table cells arg1 row number, arg2 cell num and render random letters to them
function createMatrix(row,col,tableId) {    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?<>-()*",
          randomLetter = () => letters[Math.floor(Math.random()*letters.length)];    
    let tableBody = document.createElement("tbody");
    for (r = 0; r < row; r++) {
        let tableRow = document.createElement("tr");
        for (c = 0; c < col; c++) {
            let tableCell = document.createElement("td");
            tableCell.id = `cell${r}_${c}`; // eg.: cell1_5; starts 0 so it won't collide with arrays later
            tableCell.innerHTML = randomLetter(); // temporary, just for checking how it looks
            tableRow.appendChild(tableCell);            
        } // end of inner for
        tableBody.appendChild(tableRow);    
    } // end of outer for
    document.getElementById(tableId).appendChild(tableBody);
    console.log(document.getElementById("letters"));
} // end of createMatrix