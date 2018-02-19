/*jslint browser: true */
/*global alert, confirm, console, Debug, opera, prompt, WSH, $*/

var numRounds = 7;

// Used http://jqueryui.com/ for help with all draggable and droppable content
function tileDropped(event, ui) {
    "use strict";

    var points = 0,
        tileValue = ui.draggable.attr("value"),
        tileLetter = ui.draggable.attr("letter"),
        dropID = $(this).attr("id");

    // Center the tile to the board piece
    ui.draggable.position({
        my: "center",
        at: "center",
        of: $(this)
    });

    addToWord(tileLetter, dropID);

    var attr = ui.draggable.attr('bonus');

    // Got this from http://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element 
    if (typeof attr !== typeof undefined && attr !== false) {
        // If an attribute 'bonus' was found, that means that this tile was just on another board piece, so we need to deduct the previous score before adding this one.
        var tileValueCopy = tileValue;

        removeFromWord(tileLetter, ui.draggable.attr('lastPosition'));

        if (attr === "doubleLetter") {
            tileValueCopy *= 2;
        } else if (attr === "tripleLetter") {
            tileValueCopy *= 3;
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
    } else if ($(this).hasClass("tripleLetter")) {
        // Add bonus attribute with value doubleLetter
        ui.draggable.attr("bonus", "tripleLetter");
        tileValue *= 3;
    } else {
        ui.draggable.attr("bonus", "empty");
    }

    msgNeutral("Added '" + tileLetter + "'.");

    // Add a class telling us if the tile was placed on the board before
    ui.draggable.attr("lastPosition", $(this).attr("id"));

    updateRound(tileValue);
}

function tileRemoved(event, ui) {
    "use strict";
}

function tileReturned(event, ui) {
    "use strict";

    // Remove score values if needed
    var tileValue = ui.draggable.attr("value"),
        tileLetter = ui.draggable.attr("letter"),
        attr = ui.draggable.attr('bonus');

    // Got this from http://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element 
    if (typeof attr !== typeof undefined && attr !== false) {
        if (attr === "doubleLetter") {
            tileValue *= 2;
        } else if (attr === "tripleLetter") {
            tileValue *= 3;
        }

        // Remove the attribute because it no longer is on the board
        ui.draggable.removeAttr('bonus');

        // Remove the character from the saved Word
        removeFromWord(tileLetter, ui.draggable.attr('lastPosition'));

        // Remove the attribute because it no longer needs to have a lastPosition
        ui.draggable.removeAttr("lastPosition");

        // Remove Score
        updateRound(0-parseInt(tileValue));
    }
}

function newTiles() {
    "use strict";

    initHand();
    resetRound();
    resetWord();
    initMessage();
}

function newGame() {
    "use strict";

    // Refresh the page
    document.location.reload();
}

function submit() {
    "use strict";

    var word = getWord();

    if (wordExists(word)) {
        roundToTotal();
        initHand();
        resetWord();
        msgPass("Congratulations! " + word + " is a valid word. Your score is now: " + getTotal());

        $(".tileArea").droppable({
            accept: ".tile",
            drop: tileDropped,
            out: tileRemoved
        });
    } else {
        // Create a system to handle messages
        msgError(getWord() + " is not a valid word. Please try again.");
    }
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
        drop: tileDropped,
        out: tileRemoved
    });

    // TILES HOLDER
    $("#tiles").droppable({
        accept: ".tile",
        drop: tileReturned
    });
}

$(document).ready(function () {
    "use strict";

    initialize();
    resetScores();
    initHand();
    initMessage();
});
