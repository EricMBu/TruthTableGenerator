varNum = 2;

var cellNum = 0
var columns = 2
function AddRow(){
    let table = document.getElementById("table")
    var rowCount = table.rows.length;
    var newRow = table.insertRow(rowCount);
    var cells = []
    for (let i = 0; i < columns; i++){
        cells.push(newRow.insertCell(i))
    }
    for (let i = 0; i < cells.length; i++){
        cellNum += i
        cells[i].innerHTML = "New cell " + cellNum
    } 
}

function DeleteRow(){
    let table = document.getElementById("table")
    var rowCount = table.rows.length; 
    table.deleteRow(rowCount - 1);
    cellNum -= columns
}

function AddColumn(){
    columns += 1
    let rows = document.getElementById("table").rows;
    var headCell = document.createElement("TH");
    headCell.innerHTML = "Column " + columns;
    rows[0].appendChild(headCell);
}

function DeleteColumn(){
    columns -= 1
    let rows = document.getElementById("table").rows;
    console.log(columns);
    rows[0].deleteCell(rows[0].childElementCount - 1);
}