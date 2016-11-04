/*jslint devel: true */
var numbers = [],
	mainContentArea = document.getElementById("content"),
	hMin = 0,
	hMax = 0,
	vMin = 0,
	vMax = 0,
	i = 0;

function blankInput(elemInput) {
	"use strict";
	elemInput.style.borderBottom = "solid 3px Red";
}

function validInput(elemInput) {
	"use strict";
	elemInput.style.borderBottom = "solid 3px Green";
}

function removeTable() {
	"use strict";
	
	// Try and find a pre-existing table element
	var elemTable = mainContentArea.getElementsByTagName('table')[0];
	
	// If table element exists, remove it
	if (elemTable) {
		mainContentArea.removeChild(elemTable);
	}
	
}

function displayTable(numbers) {
	"use strict";
	
	var table = document.createElement('table'),
		row,
		cell,
		data,
		h,
		v;
	
	hMin = numbers[0];
	hMax = numbers[1];
	vMin = numbers[2];
	vMax = numbers[3];
	
	console.log(hMin + " " + hMax + " " + vMin + " " + vMax);
	
	for (h = hMin - 1; h <= hMax; h += 1) {     // Rows
		row = document.createElement('tr');
		
		for (v = vMin - 1; v <= vMax; v += 1) { // Columns
			cell = document.createElement('td');
			
			if (v === vMin - 1 && h === hMin - 1) {
				// Don't print anything
				data = document.createTextNode(' ');
			} else if (h === hMin - 1) {
				// Print out the column number
				data = document.createTextNode(v);
			} else if (v === vMin - 1) {
				// Print out the row number
				data = document.createTextNode(h);
			} else {
				// Print out multiplication
				data = document.createTextNode(v * h);
			}
			
			cell.appendChild(data);
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	
	// Set id as multTable so that CSS can properly format it
	table.className = "multiplicationTable";
		
	// Add the table as a child of my main content area
	mainContentArea.appendChild(table);
}

// Firstly, get the values from each of the boxes
function getBoxValues() {
	"use strict";
	
	// Remove a pre-existing table if it exists
	removeTable();
	
	// Get all elements with class 'fourNums' and add them to a list
	var numbersBoxes = document.getElementsByClassName('fourNums'),
		// Variable to know if all 4 boxes have been filled in
	    passed = true;
	
	// Get value from each input and put it in an array
	numbers = [].map.call(numbersBoxes, function (input) {
		return input.value;
	});
	
	// Make sure every box is filled in
	for (i = 0; i < numbers.length; i += 1) {
		if (numbers[i] === '') {
			blankInput(numbersBoxes[i]);
			passed = false;
		} else {
			validInput(numbersBoxes[i]);
		}
	}
	
	// If not all boxes are filled, throw an error
	if (passed === false) {
		alert("Please fill in the blank boxes");
		return;
	}
	
	passed = true;
	
	// Make sure that the values make sense
	if (numbers[0] > numbers[1]) {
		blankInput(numbersBoxes[0]);
		blankInput(numbersBoxes[1]);
		passed = false;
	}
	if (numbers[2] > numbers[3]) {
		blankInput(numbersBoxes[2]);
		blankInput(numbersBoxes[3]);
		passed = false;
	}
	
	// If not all boxes are filled, throw an error
	if (passed === false) {
		alert("Left number must be less than or equal to the right number");
		return;
	}
	
	// If all boxes have values and are acceptable, display a table
	displayTable(numbers);
}
