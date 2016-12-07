var totalScore = 0;
var roundScore = 0;

function resetTotals() {
    "use strict";
    
    totalScore = 0;
    roundScore = 0;
    
    $("#total").html(totalScore);
    $("#round").html(roundScore);
}

function updateTotal(toAdd) {
    "use strict";
    
    totalScore += parseInt(toAdd);
    $("#total").html(totalScore);
}

function updateRound(toAdd) {
    "use strict";
    
    roundScore += parseInt(toAdd);
    $("#round").html(roundScore);
}