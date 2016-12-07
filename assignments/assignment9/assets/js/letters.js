// Modified this code from https://d1b10bmlvqabco.cloudfront.net/attach/isglehm177n60h/isglewt8cgh2bz/iw3u3rymm4fi/Scrabble_Pieces_AssociativeArray_Jesse.js and http://weblab.cs.uml.edu/~rmeza/scrabble/js/scrabble/pieces.js

/*jslint plusplus: true */

// All pieces with their respective amounts and value
var letters = [];
letters.A = { "amount": 9,  "value": 1  };
letters.B = { "amount": 2,  "value": 3  };
letters.C = { "amount": 2,  "value": 3  };
letters.D = { "amount": 4,  "value": 2  };
letters.E = { "amount": 12, "value": 1  };
letters.F = { "amount": 2,  "value": 4  };
letters.G = { "amount": 3,  "value": 2  };
letters.H = { "amount": 2,  "value": 4  };
letters.I = { "amount": 9,  "value": 1  };
letters.J = { "amount": 1,  "value": 8  };
letters.K = { "amount": 1,  "value": 5  };
letters.L = { "amount": 4,  "value": 1  };
letters.M = { "amount": 2,  "value": 3  };
letters.N = { "amount": 6,  "value": 1  };
letters.O = { "amount": 8,  "value": 1  };
letters.P = { "amount": 2,  "value": 3  };
letters.Q = { "amount": 1,  "value": 10 };
letters.R = { "amount": 6,  "value": 1  };
letters.S = { "amount": 4,  "value": 1  };
letters.T = { "amount": 6,  "value": 1  };
letters.U = { "amount": 4,  "value": 1  };
letters.V = { "amount": 2,  "value": 4  };
letters.W = { "amount": 2,  "value": 4  };
letters.X = { "amount": 1,  "value": 8  };
letters.Y = { "amount": 2,  "value": 4  };
letters.Z = { "amount": 1,  "value": 10 };
letters["["] = { "amount": 0, "value": 0 }; //This hasn't been implemented yet.

// We will use a bag database to store and collect data from
var Bag = [];

// Shuffle function from http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    "use strict";
    
	var arrayLength = array.length, t, i;

	// While there remain elements to shuffle…
	while (arrayLength) {
		// Pick a remaining element.
		i = Math.floor(Math.random() * arrayLength--);
		
		// And swap it with the current element.
		t = array[arrayLength];
		array[arrayLength] = array[i];
		array[i] = t;
	}
	
	return array;
}

// get the score value of a certain letter
function getLetterValue(letter) {
    "use strict";
    
	return letters[letter].value;
}

// Get a random piece from the bag and shuffle again
function getLetter() {
    "use strict";
    
	// Get a random index
	var RandomIndex = Math.floor(Math.random() * Bag.length),
	    // Get the piece to return
	    letter = Bag[RandomIndex];
	
	// Remove the letter from bag
	Bag.splice(RandomIndex, 1);
		
	// Shuffle the bag
	shuffle(Bag);
    
	// Return the letter
	return letter;
}

// Reset the bag
function ResetBag() {
    "use strict";
    
    var i,
        j,
        char;
    
	// Empty bag
	Bag = [];
	
	// Iterate through all letters
	for (i = 0; i < Object.keys(letters).length; i += 1) {
		// Get letter 
		char = String.fromCharCode(65 + i);
		
		for (j = 0; j < letters[char].amount; j += 1) {
			Bag.push(char);
		}
	}
	
	// Shuffle the bag
	shuffle(Bag);
}

function initHand() {
    "use strict";
    
    var tiles = $("#tiles");
    
    if (tiles.length > 0) 
        tiles.empty();
    
    ResetBag();
    ResetHand();
    DrawHand();
}