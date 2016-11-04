/**
 list:     get a list of ul elements, then get the first one
           because thats the ul that we want
 tempElem: used to create new li elements
 tempText: used to create new li elements
 header:   will hold the h1 element with id 'header'
 i:        a general purpose iterator variable
**/
var list = document.getElementsByTagName('ul')[0],
	tempElem,
	tempText,
	header,
	i = 0;

/**
  Function to easily create and return new elements of any kind
  elem: The type of tag you want to create (ex. 'li', 'span')
  msg:  The text of the new element
**/
function createNewItem(elem, msg) {
	"use strict";
	tempElem = document.createElement(elem);
	tempText = document.createTextNode(msg);
	tempElem.appendChild(tempText);
	return tempElem;
}

// ADD NEW ITEM TO END OF LIST
list.appendChild(createNewItem("li", "cream"));

// ADD NEW ITEM START OF LIST
list.insertBefore(createNewItem("li", "kale"), list.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
for (i = 0; i < list.children.length; i += 1) {
	
	// Loop through the li objects and add a class name
	list.children[i].className = "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
header = document.getElementsByTagName('h2')[0];
header.append(createNewItem("span", list.children.length));
