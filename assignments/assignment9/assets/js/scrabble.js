/*jslint browser: true */
/*global alert, confirm, console, Debug, opera, prompt, WSH, $*/

// Used http://jqueryui.com/ for help with all draggable and droppable content
function tileDropped(event, ui) {
    "use strict";

    var points = 0,
        tileValue = ui.draggable.attr("value");
    
    // Center the tile to the board piece
    ui.draggable.position({
        my: "center",
        at: "center",
        of: $(this)
    });
    
    var attr = ui.draggable.attr('bonus');
    
    // Got this from http://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element 
    if (typeof attr !== typeof undefined && attr !== false) {
        // If an attribute 'bonus' was found, that means that this tile was just on another board piece, so we need to deduct the previous score before adding this one.
        var tileValueCopy = tileValue;
        
        if (attr === "doubleLetter") {
            tileValueCopy *= 2;
        } else if (attr === "doubleWord") {
            // deal with it later
        }

        // Remove the attribute from the past location, create again if needed later on.
        ui.draggable.removeAttr('bonus');
        
        updateRound(0-parseInt(tileValueCopy));
    }
    
    // Check to see if we are on a bonus tile or an empty one
    if ($(this).hasClass("doubleLetter")) {
        // Add bonus attribute with value doubleLetter
        ui.draggable.attr("bonus", "doubleLetter");
        tileValue *= 2;
    } else if ($(this).hasClass("doubleWord")) {
        // Add bonus attribute with value doubleLetter
        ui.draggable.attr("bonus", "doubleWord");
    } else {
        ui.draggable.attr("bonus", "empty");
    }
    
    // Add a class telling us if the tile was placed before
//    ui.draggable.addClass("on");
    
    updateRound(tileValue);
    
    $(this).droppable("option", "disabled", true);
}

function tileRemoved(event, ui) {
    "use strict";
    
//    if (ui.draggable.hasClass("on")) {
//        // Remove score stuff
//        var tileValue = ui.draggable.attr("value");
//        
//        
////        if (ui.draggable.attr("bonus")) {
////            
////            tileValue *= 2;
//////            alert("double letter");
////        } else if ($(this).hasClass("doubleWord")) {
//////            alert("double word");
////        }
//        
//        updateRound(0-tileValue);
//    }
}

function tileReturned(event, ui) {
    "use strict";

    // Remove score values if needed
    var tileValue = ui.draggable.attr("value"),
        attr = ui.draggable.attr('bonus');

    // Got this from http://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element 
    if (typeof attr !== typeof undefined && attr !== false) {
        if (attr === "doubleLetter") {
            tileValue *= 2;
        } else if (attr === "doubleWord") {
            // deal with it later
        }

        // Remove the attribute because it no longer is on the board
        ui.draggable.removeAttr('bonus');
        
        // Remove Score
        updateRound(0-parseInt(tileValue));
    }
    
    // This will ALWAYS need to happen    
    $(".tileArea").droppable("option", "disabled", false);
}

function newGame() {
    // Refresh the page
    document.location.reload();
}

function initialize() {
    "use strict";
    
    // TILE
    $(".tile").draggable({
        snap: ".tileArea, .tiles",
        snapMode: "inner",
        snapTolerance: "intersect",
        revert: "invalid"
    });
    
    // BOARD
    $(".tileArea").droppable({
        accept: ".tile",
        classes: {
            "ui-droppable-active": "",
            "ui-droppable-hover": ""
        },
        drop: tileDropped,
        out: tileRemoved
    });
    
    // TILES HOLDER
    $("#tiles").droppable({
        accept: ".tile",
        classes: {
            "ui-droppable-active": "",
            "ui-droppable-hover": ""
        },
        drop: tileReturned
    });
}

$(document).ready(function () {
    "use strict";
    
    initialize();
    resetTotals();
    initHand();
});