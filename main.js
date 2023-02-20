varNum = 0;

vars = ["p","q","r","s"]
const operands = ['^','v','*','=']
const jsOps = ["&&", "||", "^", "==="]
const typedSymbols = ['^','v','*','=','>','!']
const logicSymbols = ["∧","∨","⊕","↔",'→','¬']
var columns = 2 //disintegrate this later
let expressions = []

//regex to restrict user input 
let regex = /[^]/g

function TwoVarSet(){
    ClearTable()
    varNum = 2
    regex = /[^pq>^v=)(!*]/g
    // create column headers
    for (letter of vars.slice(0,2)){
        AddColumn(letter)
    }
    // create rows
    for(var i = 0; i <= 1; i++){
        for(var n = 0; n <= 1; n++){
            AddSingleCell(Math.abs(i-1))
            AddSingleCell(Math.abs(n-1))
        }
    }
}

function ThreeVarSet(){
    ClearTable()
    varNum = 3
    regex = /[^pqr>^v=)(!*]/g
    // create column headers
    for (letter of vars.slice(0,3)){
        AddColumn(letter)
    }
    // create rows
    for(var i = 0; i <= 1; i++){        
        for(var n = 0; n <= 1; n++){
            for(var k = 0; k <= 1; k++){
                AddSingleCell(Math.abs(i-1))
                AddSingleCell(Math.abs(n-1))
                AddSingleCell(Math.abs(k-1))
            }
        }
    }
}

function FourVarSet(){
    ClearTable()
    varNum = 4
    regex = /[^pqrs>^v=)(!*]/g
    // create column headers
    for (letter of vars.slice(0,4)){
        AddColumn(letter)
    }
    // create rows
    for(var i = 0; i <= 1; i++){        
        for(var n = 0; n <= 1; n++){
            for(var k = 0; k <= 1; k++){
                for(var l = 0; l <= 1; l++){
                    AddSingleCell(Math.abs(i-1))
                    AddSingleCell(Math.abs(n-1))
                    AddSingleCell(Math.abs(k-1))
                    AddSingleCell(Math.abs(l-1))
                }   
            }
        }
    }
}

function ClearTable(){
    regex = /[^]/g
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

function AddExpression(){
    
    try{
        var exprText = document.getElementById("exprIn").value
        let table = document.getElementById("table")

        // expression is tested with first set of values
        let firstRow = table.rows[1]
        let firstRowContent = RowContentToArray(firstRow)
        const expression = GenerateExpression(exprText)
        let test = EvaluateExpression(expression, vars.slice(0,varNum), firstRowContent)

        //continues if test is successful
        AddColumn(ReplaceCharacters(exprText))
        for (var i = 1; i < table.rows.length; i++){
            var row = table.rows[i]
            var rowSize = row.cells.length
            var rowContent = RowContentToArray(row)
            var newCellContent = EvaluateExpression(expression, vars.slice(0,varNum), rowContent)
            var newCell = row.insertCell(rowSize)
            newCell.innerHTML = newCellContent;
        }
    }
    catch(err){
        window.alert("Error: invalid expression")
    }
    
}

// Expression generator, returns in form of array
function GenerateExpression(input){
    var newExpr = input.replaceAll(' ','');
    var exprArr = newExpr.split('');
    if(newExpr.includes('>')){
        let imps = ArrCount(exprArr, '>');
        for(let n = 0; n < imps; n++){
            let index = exprArr.indexOf('>')
            exprArr[index] = '?'
            exprArr.unshift("(")
            exprArr.splice(index + 3, 0, ":true)");
        }
    }
    for (let i = 0; i < operands.length; i++){
        exprArr = ArrReplaceAll(exprArr, operands[i], jsOps[i]);
    }
    return exprArr;
}

function EvaluateExpression(exprIn, varsIn, intValues){
    var expr = [...exprIn];
    let values = BoolArray(intValues)
    // varsIn correlates with values
    let valDict = CreateDict(varsIn, values)
    for(var i = 0; i < expr.length; i++){
        var curChar = expr[i]
        if(varsIn.includes(curChar)){
            expr[i] = valDict[curChar]
        }
    }
    
    let newExpr = expr.join('');
    
    // result must be return as 1 or 0 character
    let result = eval(newExpr);
    return result ? '1' : '0'
}

function CreateDict(keys, values){
    var dict = {}
    let i = 0
    for(key of keys){
        dict[key] = values[i]
        i++
    }
    return dict
}

function BoolArray(arr){
    let newArr = []
    for(elem of arr){
        if(elem == "0"){
            newArr.push("false")
        }
        else{
            newArr.push("true")
        }
    }
    return newArr
}

function TrimCharacters(input){
    input.value = input.value.replace(regex, '');
}

function RowContentToArray(row){
    arr = []
    for (cell of row.cells){
        arr.push(cell.innerHTML)
    }
    return arr
}

function ArrCount(arr, elem){
    var n = 0
    for (x of arr){
        if (x == elem){
            n++;
        }
    }
    return n
}

function ArrReplaceAll(arrIn, elem1, elem2){
    let newArr = []
    for (x of arrIn){
        (x == elem1) ? newArr.push(elem2) : newArr.push(x)
    }
    return newArr
}

function TypeCharacter(char){
    document.getElementById("exprIn").value += char;
}

function Backspace(){
    let text = document.getElementById("exprIn").value
    document.getElementById("exprIn").value = text.slice(0, (text.length - 1))
}

function ReplaceCharacters(strIn){
    for (i in typedSymbols){
        strIn = strIn.replaceAll(typedSymbols[i], logicSymbols[i])
    }
    return strIn
}