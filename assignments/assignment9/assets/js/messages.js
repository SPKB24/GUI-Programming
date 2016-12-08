var errorColor = "red";
var passColor = "green";
var neutralColor = "white";
var message = $("#messages");

function initMessage() {
    "use strict";
    
    message.html("Good Luck!");
    changeColor(neutralColor);
}

function msgError(msg) {
    "use strict";
    
    message.html(msg);
    changeColor(errorColor);
}

function msgPass(msg) {
    "use strict";
    
    message.html(msg);
    changeColor(passColor);
}

function msgNeutral(msg) {
    "use strict";
    
    message.html(msg);
    changeColor(neutralColor);
}

function changeColor(newColor) {
    "use strict";
    
    message.css({'color': newColor});
}