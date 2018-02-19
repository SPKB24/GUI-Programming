// This will hold 7 pieces at a time
var Hand = [];

// ResetHand() will populate the Hand array with 7 pieces
function ResetHand() {
    "use strict";

    var i;

    // Reset hand
    Hand = [];

    // Check if there are enough pieces in the bag for a full hand
    if (Bag.length > 7) {
        // Pick until you have 7 pieces
        for (i = 0; i < 7; i += 1) {
            // Get a piece and put it into your hand
            Hand.push(getLetter());
        }
    } else if (Bag.length > 0) {
        // Take the rest of the bag
        for (i = 0; i <= Bag.length; i++) {
            // Get a piece and put it into your hand
            Hand.push(getLetter());
        }
    }
}

// DrawPiece(letter) returns an HTML string of 'letter' to be drawn
function DrawPiece(letter) {
    //  letter as uppercase
    var upper = letter.toUpperCase(),
        // Value of letter
        val = getLetterValue(letter),
        // Piece template
        template = '';

    // Check if you have a blank piece
    template = '<li letter="'+upper+'" value="'+val+'" class="tile"><span>' + upper + '<span class="value">' + val + '</span></span></li>';

    // Return HTML string
    return template;
}

// DrawHand() draws the tiles to the screen
function DrawHand() {
    // Where to draw the hand
    var parent = $('#tiles'),
        // Build an HTML string
        toDraw = '',
        i;

    // Draw each piece in the hand
    for(i = 0; i < Hand.length; i++) {
        // Add HTML to be drawn
        toDraw += DrawPiece(Hand[i]);
    }

    // Add toDraw to parent's html
    parent.append(toDraw);

    // Make pieces draggable
    $(".tile").draggable({
        snap: ".tileArea, .tiles",
        snapMode: "inner",
        snapTolerance: "intersect",
        revert: "invalid"
    });
}
