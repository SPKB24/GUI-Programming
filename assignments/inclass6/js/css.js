$(function() {
    // Create variable to hold background color of the first list item
    var $backgroundColor = $('li:first').css('background-color');
    
    // Print out the background color (as RGB value)
    $('ul').append(function() {
        return "<p>" + $backgroundColor + "</p>";
    }).after();
    
    // Set list item properties as asked for in assignment guidelines
    $('li').css('background-color', '#c5a996');
    $('li').css('border', 'solid 1px white');
    $('li').css('color', 'black');
    $('li').css('text-shadow', 'none');
    $('li').css('font-family', 'Georgia');
});