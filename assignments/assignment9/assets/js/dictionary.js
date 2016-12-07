/*jslint browser: true */
/*global alert, confirm, console, Debug, opera, prompt, WSH, $*/

/* This code was created by Jesse Heines. Found code at https://piazza.com/class/isglehm177n60h?cid=61 */

// The dictionary lookup object
var dict = {};
 
// Do a jQuery Ajax request for the text dictionary
$.get("assets/dictionary.txt", function (txt) {
    "use strict";
    
    // Get an array of all the words
    var words = txt.split("\n"),
        i;

    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for (i = 0; i < words.length; i += 1) {
        dict[words[i]] = true;
    }
});
 
// Modified to only pass in one word, which can then be verified.
function wordExists(word) {
    "use strict";
    
    // See if it's in the dictionary
    if (dict[word]) {
        // If it is, return that word
        return true;
    }

    // Otherwise, it isn't in the dictionary.
    return false;
}