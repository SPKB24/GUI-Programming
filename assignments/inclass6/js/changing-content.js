$(function() {    
    // If list item contains pine, change to almonds
    $("li:contains('pine')").text("almonds");
    
    // Find items with class hot, add the <em> tag to them
    $("li.hot").html(function() {
        return '<em>' + $(this).text() + '</em>';
    });
    
    // Remove first list item
    $("li#one").remove();
});