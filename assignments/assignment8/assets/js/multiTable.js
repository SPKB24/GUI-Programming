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
	mainContentArea = document.getElementById("tableArea"),
	hMin = 0,
	hMax = 0,
	vMin = 0,
	vMax = 0,
	i = 0,
    tabIndex = 0,
    tabs = $("#savedTables").tabs();

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
    
	// Load the new table into the dedicated table area
    $("#tableArea").html(table);
}

// Firstly, get the values from each of the boxes
function getBoxValues(boolDisplay) {
	"use strict";
	
    // Makeshift default parameter of true
    if (boolDisplay === undefined) {
        boolDisplay = true;
    }

    // Remove a pre-existing table if it exists
    if (boolDisplay) {
        removeTable();
    }
    
	// Get all elements with class 'fourNums' and add them to a list
	var numbersBoxes = document.getElementsByClassName('fourNums');
    
	// Get value from each input and put it in an array
	numbers = [].map.call(numbersBoxes, function (input) {
		return parseInt(input.value, 10);
	});
	
	// If all boxes have values and are acceptable, display a table
    if (boolDisplay === true) {
        console.log("Displaying Table");
        displayTable(numbers);
    } else {
        console.log("Returning Numbers");
        return numbers;
    }
}

function updateIfValidated() {
    "use strict";
    
    // Learned from: http://stackoverflow.com/questions/24745017/check-if-form-validation-is-true
    
    // If the form is valid, get the values and create a table, otherwise, remove table if it exists
    if ($('#myForm').valid()) {
        getBoxValues();
    } else {
        removeTable();
    }
}

function saveTable() {
    "use strict";
    // Used: https://jqueryui.com/tabs/#manipulation for help in creating this function
    
    if ($('#myForm').valid()) {
    
        // Create tabs
        var savedTables = $("#savedTables"),
            numbers = getBoxValues(false),
            tabsCount = $(savedTables).length,
            title = '';

        // Get each individual value
        hMin = numbers[0];
        hMax = numbers[1];
        vMin = numbers[2];
        vMax = numbers[3];

        console.log("numbers = " + vMin + " " + vMax + " " + hMin + " " + hMax);

        title = "<li class='tab'><a href='#tab-" + tabIndex + "'>[" + hMin +
                    ", " + hMax + "] x [" + vMin + ", " + vMax + "]</a>" +
                    "<span class='ui-icon ui-icon-close' role='presentation'></span></li>";

        // Add a new Title bar.
        tabs.find(".ui-tabs-nav").append(title);

        // Add the current multiplication table.
        tabs.append('<div id="tab-' + tabIndex + '">' + $("#tableArea").html() + '</div>');

        // Refresh the tabs div so that the new tab shows up.
        tabs.tabs("refresh");

        // Make the new tab active, so that the user knows it updated.
        tabs.tabs("option", "active", -1);
        
        // Update the tabIndex
        tabIndex += 1;
        
        // Remove a tab
        tabs.on("click", "span.ui-icon-close", function () {
            var panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
            tabs.tabs("refresh");
        });
    }
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
                min: -10,
                max: 10,
                required: true,
                number: true,
                lessThan: "#num2"
            },
            two: {
                min: -10,
                max: 10,
                required: true,
                number: true,
                greaterThan: "#num1"
            },
            three: {
                min: -10,
                max: 10,
                required: true,
                number: true,
                lessThan: "#num4"
            },
            four: {
                min: -10,
                max: 10,
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

function loadSlider() {
    "use strict";

    // This function will both load sliders into the code, and update the table whenever there is a valid value change.
    
    // Handle slider update for num1Slider
    $("#num1Slider").slider({
        min: -10,
        max: 10,
        animate: true,
        slide: function (event, ui) {
            $("#num1").val(ui.value);
            updateIfValidated();
        }
    });
    // Handle input field update for num1
    $("#num1").on("keyup", function () {
        $("#num1Slider").slider("value", this.value);
        updateIfValidated();
    });
    
    // Handle slider update for num2Slider
    $("#num2Slider").slider({
        min: -10,
        max: 10,
        animate: true,
        slide: function (event, ui) {
            $("#num2").val(ui.value);
            updateIfValidated();
        }
    });
    // Handle input field update for num1
    $("#num2").on("keyup", function () {
        $("#num2Slider").slider("value", this.value);
        updateIfValidated();
    });
    
    // Handle slider update for num1Slider
    $("#num3Slider").slider({
        min: -10,
        max: 10,
        animate: true,
        slide: function (event, ui) {
            $("#num3").val(ui.value);
            updateIfValidated();
        }
    });
    // Handle input field update for num1
    $("#num3").on("keyup", function () {
        $("#num3Slider").slider("value", this.value);
        updateIfValidated();
    });
    
    // Handle slider update for num1Slider
    $("#num4Slider").slider({
        min: -10,
        max: 10,
        animate: true,
        slide: function (event, ui) {
            $("#num4").val(ui.value);
            updateIfValidated();
        }
    });
    // Handle input field update for num1
    $("#num4").on("keyup", function () {
        $("#num4Slider").slider("value", this.value);
        updateIfValidated();
    });
}