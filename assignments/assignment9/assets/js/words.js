var characters = [];
characters.one = { "value": '' };
characters.two = { "value": '' };
characters.three = { "value": '' };
characters.four = { "value": '' };
characters.five = { "value": '' };
characters.six = { "value": '' };
characters.seven = { "value": '' };
characters.eight = { "value": '' };
characters.nine = { "value": '' };
characters.ten = { "value": '' };
characters.eleven = { "value": '' };
characters.twelve = { "value": '' };
characters.thirteen = { "value": '' };
characters.fourteen = { "value": '' };
characters.fifteen = { "value": '' };

function getWord() {
    "use strict";
    
    var i = 0,
        string = '',
        key,
        keys = [],
        found = false;
    
    for (key in characters) {
        if (characters[key].value !== '' || found === true) {
            // add the newly found character to string
            if (characters[key].value === '') {
                string += ' ';
            } else {
                string += characters[key].value;
            }
            
            found = true;
        }
    }
    
    return string.trim();
}

function wordIsValid(word) {
    "use strict";
    
    var i;
    
    for (i = 0; i < word.length; i++) {
        
        console.log("word[" + i + "] === " + word[i]);
        if (word[i] === ' ') {
            return false;
        }
    }
    return true;
}

function updateWord() {
    "use strict";
    
    var currentWord = getWord();
    
    console.log("Current Word = " + currentWord);
    
    if (wordIsValid(currentWord))
        $("#word").html(currentWord);
    else
        $("#word").html("INVALID");
}

function addToWord(letter, id) {
    "use strict";
    
    console.log("Adding " + letter + " at location " + id);
    characters[id].value = letter;  
    updateWord();
}

function removeFromWord(letter, id) {
    "use strict";
    
    console.log("Removing " + letter + " from location " + id);
    
    characters[id].value = '';
    updateWord();
}

function resetWord() {
    "use strict";
    
    var key;
    
    for (key in characters) {
        characters[key].value = '';
    }
    
    updateWord();
}