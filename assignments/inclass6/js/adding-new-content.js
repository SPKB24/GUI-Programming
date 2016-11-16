$(function() {
    // Add "Just Updated" paragraph before the list
    $("ul").before('<p>Just Updated</p>');
    
    // Find all elements with class hot and add "+" before them
    $("li.hot").prepend("+ ");
    
    // Create new li object, add to back of the list
    var newListItem = $("<li><em>gluten-free</em> soy sauce</li>")
    $("li:last").after(newListItem);
});