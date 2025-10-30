// github.com/llamabyday

var hMinBox = document.getElementById('horizontalMin');
var hMaxBox = document.getElementById('horizontalMax');
var vMinBox = document.getElementById('verticalMin');
var vMaxBox = document.getElementById('verticalMax');
var submitButton = document.getElementById('submitButton');
var hError = document.getElementById('horizontalError');
var vError = document.getElementById('verticalError');
var multTable = document.getElementById('multTable');
var tableScroll = document.getElementById('tableScroll');
var rangeErrorString = "Please enter a number between 99 and -99.";
var sameErrorString = "Please enter two different values.";
var emptyErrorString = "Please enter a number.";

function buttonClicked() {
    var hMin = hMinBox.value;
    var hMax = hMaxBox.value;
    var vMin = vMinBox.value;
    var vMax = vMaxBox.value;
    
    var valid = numberValidation(hMin, hMax, vMin, vMax);

    if (valid) {
        var temp; 
        if (hMin > hMax) {
            temp = hMax;
            hMax = hMin;
            hMin = temp;
        }
        if (vMin > vMax) {
            temp = vMax;
            vMax = vMin;
            vMin = temp;
        }
        createTable(hMin, hMax, vMin, vMax);
    }
}

function numberValidation(hMin, hMax, vMin, vMax) {
    hError.innerText = "";
    vError.innerText = "";
    hMinBox.className = "valid";
    hMaxBox.className = "valid";
    vMaxBox.className = "valid";
    vMinBox.className = "valid";
    var valid = true;
    const min = -99;
    const max = 99;

    if (hMin == hMax) {
        hMinBox.className = "invalid";
        hMaxBox.className = "invalid";
        hError.innerText = sameErrorString;
        valid = false;
    }
    if (hMin < min || hMin > max) {
        hMinBox.className = "invalid";
        hError.innerText = rangeErrorString;
        valid = false;
    }
    if (hMax < min || hMax > max) {
        hMaxBox.className = "invalid";
        hError.innerText = rangeErrorString;
        valid = false;
    }
    if (hMin == "") {
        hMinBox.className = "invalid";
        hError.innerText = emptyErrorString;
        valid = false;
    }
    if (hMax == "") {
        hMaxBox.className = "invalid";
        hError.innerText = emptyErrorString;
        valid = false;
    }

    if (vMin == vMax) {
        vMinBox.className = "invalid";
        vMaxBox.className = "invalid";
        vError.innerText = sameErrorString;
        valid = false;
    }
    if (vMin < min || vMin > max) {
        vMinBox.className = "invalid";
        vError.innerText = rangeErrorString;
        valid = false;
    }
    if (vMax < min || vMax > max) {
        vMaxBox.className = "invalid";
        vError.innerText = rangeErrorString;
        valid = false;
    }
    if (vMin == "") {
        vMinBox.className = "invalid";
        vError.innerText = emptyErrorString;
        valid = false;
    }
    if (vMax == "") {
        vMaxBox.className = "invalid";
        vError.innerText = emptyErrorString;
        valid = false;
    }
    return valid;
}

function createTable(hMin, hMax, vMin, vMax) {
    const hValues = [];
    const vValues = [];
    for (let i = hMin; i <= hMax; i++) {
        hValues.push(i);
    }
    for (let i = vMin; i <= vMax; i++) {
        vValues.push(i);
    }

    tableStructure = [];
    createTableStructure(tableStructure, hValues, vValues);

    var tableHTML = createTableHTML(tableStructure);
    multTable.innerHTML = tableHTML;
    tableScroll.className = "tableScroll";
}

function createTableStructure(table, hValues, vValues) {

    let firstRow = []; //Uniquely define first row
    firstRow.push("");
        for (let j = 0; j < hValues.length; j++) {
            firstRow.push(hValues[j]);
        }
    table.push(firstRow);

    for (let i = 0; i < vValues.length; i++) { //Generally define all following rows
        let row = []; 

        row.push(vValues[i]) //Uniquely define first element of each row

        for (let j = 0; j < hValues.length; j++) { //Generally define all following elements
            row.push(vValues[i]*hValues[j]);
        }
        table.push(row);
    }
}

function createTableHTML(table) {
    var html = "";
    for (let i = 0; i < table.length; i++) {
        html += "<tr>\n";
        for (let j = 0; j < table[i].length; j++) {
            html += "<td>";
            html += table[i][j];
            html += "</td>\n";
        }
        html += "</tr>\n";
    }
    return html;
}