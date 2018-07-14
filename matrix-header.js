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
    function checkNext() {                
        const findFirstNotEmpty=()=>matrix.findIndex(e=>e.match(/\.+/g).length!==1);  // skip empty rows
        if (findFirstNotEmpty()===-1) return false;  
        const lastValidChar=()=>matrix[findFirstNotEmpty()].split("").map(e=>e==".").lastIndexOf(false), // search for the last index of valid character in the non empty row                    
              lights=(x,y,onOff,el=document.getElementById(`cell${x}_${y<0?0:y}`))=>
                  onOff?el.style.color="#a5c5de":el.style.color="rgba(50, 50, 50, 0.3)";
        lights(findFirstNotEmpty(),count-1,false);
        lights(findFirstNotEmpty(),count,true);
        if (count==lastValidChar()){
            count=0; 
            matrix[findFirstNotEmpty()]=matrix[findFirstNotEmpty()].replace(/[^.]+/g,e=>e.substring(0,e.length-1)+".");
        }
        else ++count;        
        return true;
    } // end of checkNext
    var timer = setInterval(()=>{ 
        if (!checkNext()) {
            clearInterval(timer);
            document.getElementsByTagName("header")[0].style.borderBottomColor = "#a5c5de"; // set color because it changes back transparent after animation
            document.getElementsByTagName("header")[0].style.animationName = "bottomBorder";
            document.getElementsByTagName("header")[0].style.WebkitAnimationName ="bottomBorder";
            document.getElementsByTagName("header")[0].style.animationDuration = "2s";
            console.log(document.getElementsByTagName("header").className);
        } },1);// call checkNext and clear interval if display done    
} // end of headerStart