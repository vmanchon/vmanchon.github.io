/*var express = require('express');
var app = express();
var fs = require('fs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
app.use(express.static('public'))*/

function generateButtons(buttonCount) {
    const table = document.getElementById('buttonTable');
    table.innerHTML = ''; // Clear existing buttons
    let currentButton = 1;

    for (let i = 0; i < Math.ceil(buttonCount / 3); i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3 && currentButton <= buttonCount; j++) {
            const cell = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = `Button ${currentButton}`;
            cell.appendChild(button);
            row.appendChild(cell);
            currentButton++;
        }
        table.appendChild(row);
    }
}

function updateButtons() {
    const input = document.getElementById('buttonCountInput');
    const buttonCount = parseInt(input.value, 10) || 0;
    if (buttonCount > 0) {
        generateButtons(buttonCount);
    } else {
        alert('Please enter a valid number greater than 0.');
    }
}

// Initial call to generate buttons
//generateButtons(10);





/*
async function getDBConnection(){
    const db = await sqlite.open({
        filename: "db.sqlite",
        driver: sqlite3.Database
    });
    return db;
}

app.get('/api/venteDeFleurs', async function(req, res){
    let db = await getDBConnection();
    let vdf = await db.all("SELECT * from VenteDeFleurs");
    await db.close();
    return res.json(vdf)
})

var port = 3306;
app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
});

async function fetchAndGenerateButtons() {
    try {
        // Simulate fetching data from the VenteDeFleurs table
        const response = await fetch('/api/venteDeFleurs'); // Replace with actual API endpoint
        const records = await response.json();
        alert(records);
        const table = document.getElementById('fleurTable');
        table.innerHTML = ''; // Clear existing buttons

        let currentButton = 1;
        for (let i = 0; i < Math.ceil(records.length / 3); i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 3 && currentButton <= records.length; j++) {
                const cell = document.createElement('td');
                const button = document.createElement('button');
                button.textContent = records[currentButton - 1].NomProduit;
                cell.appendChild(button);
                row.appendChild(cell);
                currentButton++;
            }
            table.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching records:', error);
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerHTML = error; 
        alert('Failed to fetch records. Please try again later.');
    }
}*/

// Example usage: Call fetchAndGenerateButtons to populate buttons
//fetchAndGenerateButtons();

function createCalculator() {
    const calcButtons = [
        { text: 'Jaune', value: '1', color: 'yellow' },
        { text: 'Marron', value: '1.5', color: 'brown' },
        { text: 'Rose', value: '2.5', color: 'pink' },
        { text: 'Orange', value: '3', color: 'orange' },                
        { text: 'Noir', value: '5.5', color: 'black' },              
        { text: 'Bleu', value: '10', color: 'blue' },                  
        { text: 'Blanc', value: '13', color: 'white' },        
        { text: '=', value: '=', color: '#90ee90' }        
    ];

    const calcButtonsContainer = document.getElementById('calcButtons');
    const calcDisplay = document.getElementById('calcDisplay');
    const calcSummary = document.getElementById('calcSummary');
    const calcResult = document.getElementById('calcResult');
    const calcHistory = document.getElementById('calcHistory');

    let currentExpressionValue = '';
    let currentExpressionText = '';
    let result = '00';
    calcButtons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.style.backgroundColor = button.color;
        btn.style.padding = '10px';
        btn.style.fontSize = '16px';
        btn.onclick = () => {
            if (button.value === '=') {
                try {
                    currentExpressionValue = currentExpressionValue.substring(0, currentExpressionValue.length - 1);
                    result = eval(currentExpressionValue).toString();
                    const historyItem = document.createElement('li');
                    historyItem.textContent = `${currentExpressionText} = ${result}`;
                    calcHistory.appendChild(historyItem);
                    currentExpressionValue = '';
                    currentExpressionText = '';
                } catch {
                    currentExpressionValue = 'Error';
                }
            } else {
                currentExpressionValue += button.value + '+';
                currentExpressionText += button.text + '-';
                result = currentExpressionValue.substring(0, currentExpressionValue.length - 1);
                result = eval(result).toString();
            }
            calcDisplay.textContent = currentExpressionValue;
            calcSummary.textContent = `Total: ${currentExpressionText}`;
            calcSummary.textContent += ` (${currentExpressionValue.split('+').length - 1} items)`; 
            calcResult.textContent = `Result: ${result}`;
        };
        calcButtonsContainer.appendChild(btn);
    });
}

function downloadCSV(){
    
    const rows = calcHistory.querySelectorAll('li');
    let csvContent = 'data:text/csv;charset=utf-8,';
    var rowTitle = `Jaune,Marron,Rose,Orange,Noir,Bleu,Blanc,Total,Montant\n`;
    csvContent += rowTitle;
    rows.forEach(row => {
        var jaune = (row.textContent.match(/Jaune/g) || []).length;
        var marron = (row.textContent.match(/Marron/g) || []).length;
        var rose = (row.textContent.match(/Rose/g) || []).length;
        var orange = (row.textContent.match(/Orange/g) || []).length;
        var noir = (row.textContent.match(/Noir/g) || []).length;
        var bleu = (row.textContent.match(/Bleu/g) || []).length;
        var blanc = (row.textContent.match(/Blanc/g) || []).length;
        var total = jaune + marron + rose + orange + noir + bleu + blanc;
        var totalPrice = (jaune * 1) + (marron * 1.5) + (rose * 2.5) + (orange * 3) + (noir * 5.5) + (bleu * 10) + (blanc * 13);
        var rowData = `${jaune},${marron},${rose},${orange},${noir},${bleu},${blanc},${total},${totalPrice}`;
        csvContent += rowData + '\n';
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'calculator_history.csv');
    document.body.appendChild(link);
    link.click();

    console.error(calcHistory.textContent);
}

function resetCalculator() {
    const calcDisplay = document.getElementById('calcDisplay');
    calcDisplay.textContent = '0';
    currentExpressionValue = '';
}

// Initialize the calculator
createCalculator();