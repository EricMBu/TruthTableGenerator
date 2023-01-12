varNum = 0;

vars = ["p","q","r","s"]
var columns = 2 //disintegrate this later
let expressions = []

function TwoVarSet(){
    ClearTable()
    varNum = 2
    // create column headers
    for (letter of vars.slice(0,2)){
        AddColumn(letter)
    }
    // create rows
    for(var i = 0; i <= 1; i++){
        for(var n = 0; n <= 1; n++){
            AddSingleCell(i)
            AddSingleCell(n)
        }
    }
}

function ThreeVarSet(){
    ClearTable()
    varNum = 3
    // create column headers
    for (letter of vars.slice(0,3)){
        AddColumn(letter)
    }
    // create rows
    for(var i = 0; i <= 1; i++){        
        for(var n = 0; n <= 1; n++){
            for(var k = 0; k <= 1; k++){
                AddSingleCell(i)
                AddSingleCell(n)
                AddSingleCell(k)
            }
        }
    }
}

function FourVarSet(){
    ClearTable()
    varNum = 4
    // create column headers
    for (letter of vars.slice(0,4)){
        AddColumn(letter)
    }
    // create rows
    for(var i = 0; i <= 1; i++){        
        for(var n = 0; n <= 1; n++){
            for(var k = 0; k <= 1; k++){
                for(var l = 0; l <= 1; l++){
                    AddSingleCell(i)
                    AddSingleCell(n)
                    AddSingleCell(k)
                    AddSingleCell(l)
                }   
            }
        }
    }
}


function ClearTable(){
    let table = document.getElementById("table")
    let length = table.rows.length
    let rowOne = table.rows[0] 
    let rowLength = rowOne.cells.length
    for (let i = 0; i < length - 1; i++){
        DeleteRow()
    }
    for (var n = 0; n < rowLength; n++){
        rowOne.deleteCell(0)
    }

}

function AddRow(text){
    let table = document.getElementById("table")
    var rowCount = table.rows.length;
    var newRow = table.insertRow(rowCount);
    var cells = []
    for (let i = 0; i < columns; i++){
        cells.push(newRow.insertCell(i))
    }
    for (let i = 0; i < cells.length; i++){
        cells[i].innerHTML = text
    } 
}

function DeleteRow(){
    let table = document.getElementById("table")
    var rowCount = table.rows.length; 
    table.deleteRow(rowCount - 1);
}

function AddColumn(text){
    columns += 1
    let rows = document.getElementById("table").rows;
    var headCell = document.createElement("TH");
    headCell.innerHTML = text;
    rows[0].appendChild(headCell);
}

function DeleteColumn(){
    columns -= 1
    let rows = document.getElementById("table").rows;
    rows[0].deleteCell(rows[0].childElementCount - 1);
}

function AddSingleCell(text){
    let table = document.getElementById("table")
    var rowSize = table.rows[0].cells.length
    var rowCount = table.rows.length;
    let currentRow = table.rows[rowCount - 1]
    var currentRowSize = currentRow.cells.length

    if(currentRowSize < rowSize){
        cell = currentRow.insertCell(currentRowSize)
    }
    else{
        var newRow = table.insertRow(rowCount);
        cell = newRow.insertCell(0) 
    }
    cell.innerHTML = text
    
}