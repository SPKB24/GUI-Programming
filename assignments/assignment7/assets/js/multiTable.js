/*
 FILE: multiTable.js

 NAME   : Sohit Pal
 EMAIL  : sohit_pal@student.uml.edu
 SCHOOL : Umass Lowell
 COURSE : GUI Programming I

 DESCRIPTION:
         This file is handles creating a multiplication table in javascript
*/

/*jslint devel: true */
/*jslint browser: true*/
/*global $, jQuery, alert*/

var numbers = [],
	mainContentArea = document.getElementById("content"),
	hMin = 0,
	hMax = 0,
	vMin = 0,
	vMax = 0,
	i = 0;

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
	
	console.log(vMin + " " + vMax + " " + hMin + " " + hMax);
	
	for (h = vMin - 1; h <= vMax; h += 1) {     // Rows
		row = document.createElement('tr');
		
		for (v = hMin - 1; v <= hMax; v += 1) { // Columns
			cell = document.createElement('td');
			
			if (v === hMin - 1 && h === vMin - 1) {
				// Don't print anything
				data = document.createTextNode(' ');
			} else if (h === vMin - 1) {
				// Print out the column number
				data = document.createTextNode(v);
			} else if (v === hMin - 1) {
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
	var numbersBoxes = document.getElementsByClassName('fourNums');
    
	// Get value from each input and put it in an array
	numbers = [].map.call(numbersBoxes, function (input) {
		return parseInt(input.value, 10);
	});
	
	// If all boxes have values and are acceptable, display a table
	displayTable(numbers);
}

function validate() {
    "use strict";
    
    // Create functions to handle lessThan and greaterThan properties
    $.validator.addMethod("lessThan", function (value, element, param) {
        var $otherElement = $(param);
        if (!$otherElement.val() || $otherElement.val() === 0) {
            return true;
        }
        return parseInt(value, 10) <= parseInt($otherElement.val(), 10);
    }, 'This needs to be less than the second field');
    $.validator.addMethod("greaterThan", function (value, element, param) {
        var $otherElement = $(param);
        if (!$otherElement.val() || $otherElement.val() === 0) {
            return true;
        }
        return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
    }, 'This needs to be greater than the first field');
    
    // Validate myForm
    $("#myForm").validate({
        
        // Rules for validating the form.
        rules: {
            one: {
                required: true,
                number: true,
                lessThan: "#num2"
            },
            two: {
                required: true,
                number: true,
                greaterThan: "#num1"
            },
            three: {
                required: true,
                number: true,
                lessThan: "#num4"
            },
            four: {
                required: true,
                number: true,
                greaterThan: "#num3"
            }
        },
        
        // Messages to display on error
        messages: {
            one: {
                required: 'This field is required!',
                number: 'This needs to be a number'
            },
            two: {
                required: 'This field is required!',
                number: 'This needs to be a number'
            },
            three: {
                required: 'This field is required!',
                number: 'This needs to be a number'
            },
            four: {
                required: 'This field is required!',
                number: 'This needs to be a number'
            }
        },
        
        // Handler for submit button click
        submitHandler: function () {
            getBoxValues();
            return false;
        },
        
        // Where to show error messages
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });
}
