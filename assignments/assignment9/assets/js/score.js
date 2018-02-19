var totalScore = 0;
var roundScore = 0;

function resetRound() {
    roundScore = 0;

    $("#round").html(roundScore);
}

function getTotal() {
    "use strict";

    return totalScore;
}

function getRound() {
    "use strict";

    return roundScore;
}

function resetTotal() {
    totalScore = 0;

    $("#total").html(totalScore);
}

function resetScores() {
    "use strict";

    resetRound();
    resetTotal();
}

function roundToTotal() {
    totalScore += roundScore;
    $("#total").html(totalScore);

    roundScore = 0;
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
