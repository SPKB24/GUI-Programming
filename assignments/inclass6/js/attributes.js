$(function() {
    // Remove class attribute from third list item
    $("li:nth-child(3)").removeClass();
    
    // Add class 'favorite' to any list items that have class 'hot'
    $("li.hot").addClass("favorite");
});