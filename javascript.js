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

function resetCalculator() {
    const calcDisplay = document.getElementById('calcDisplay');
    calcDisplay.textContent = '0';
    currentExpressionValue = '';
}

// Initialize the calculator
createCalculator();