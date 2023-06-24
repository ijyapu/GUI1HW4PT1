/*
 File: script.js
 Assignment: Dynamic Interactive Table
 Bikash Shrestha, UMass Lowell Computer Science, Bikash_Shrestha@student.uml.edu
 Copyright (c) 2023 by Bikash Shrestha. All rights reserved. May be
 freely copied or excerpted for educational purposes with credit to the
 author.
 Updated by BS on June 23, 2023, at 7:30 PM.
 Instructor: Professor Wenjin Zhou
 Help: w3 Schools/ Stack Overflow / jQuery / Google 
 Basic Description: This is the part one of fourth assignment where we use jQuery in addition to HTML and CSS to create the interactive multiplication table. 
*/

// Function to get input values and return an object with key-value pairs
function getInputValues(){
  var minColElement = document.getElementById("minc");
  var minColVal = document.getElementById("minc").value;
  var maxColElement = document.getElementById("maxc");
  var maxColVal = document.getElementById("maxc").value;
  var minRowElement = document.getElementById("minr");
  var minRowVal = document.getElementById("minr").value;
  var maxRowElement = document.getElementById("maxr");
  var maxRowVal = document.getElementById("maxr").value;
  var input = {minCol: [minColVal, minColElement], 
              maxCol: [maxColVal, maxColElement],
              minRow: [minRowVal, minRowElement],
              maxRow: [maxRowVal, maxRowElement]};
  return input;
  }


  // Function to generate the table
function generateTable(input){
  // Get the existing table element and remove it
  var table = document.getElementById("table");
  table.remove();
  // Get the parent div for the table
  input.minCol[0] = parseInt(input.minCol[0]);
  input.maxCol[0] = parseInt(input.maxCol[0]);
  input.minRow[0] = parseInt(input.minRow[0]);
  input.maxRow[0] = parseInt(input.maxRow[0]);
  // creates new HTML table
  var tableParentDiv = document.getElementById("coltable");
  // Create a new table element and set its ID
  var newTable = document.createElement("table");
  newTable.id = "table";
   // Create new <thead> and <tbody> elements and append them to the new table
  tableParentDiv.appendChild(newTable);
  var newThead = document.createElement("thead");
  var newTbody = document.createElement("tbody");
  newTable.appendChild(newThead);
  newTable.appendChild(newTbody);
  var newTr = document.createElement("tr");
  newThead.appendChild(newTr);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var tHeadtBodyPair = document.getElementById("table").children;
  var tHead = tHeadtBodyPair[0];
  var trCollection = tHead.children;
  var tableColHeaders = trCollection[0].children;
  tableColHeaders[1].innerHTML = input.minCol[0];
  
  // Loop to generate additional <th> elements for the table column headers
  for(var i = input.minCol[0] + 1; i <= input.maxCol[0]; i++) {
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(i);
    newTh.appendChild(textNode);
    trCollection[0].appendChild(newTh);
  }
  
  // Loop to generate table rows and cells
  for(var j = input.minRow[0]; j <= input.maxRow[0]; j++) {
    // Create a new <tr> element and append it to the <tbody>
    var newTr = document.createElement("tr");
    tHeadtBodyPair[1].appendChild(newTr);
    // Get the last appended <tr> element (current row)
    var lastTr = tHeadtBodyPair[1].lastElementChild;
    // Create a new <th> element for the row header and append it to the current row
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(j);
    newTh.appendChild(textNode);
    lastTr.appendChild(newTh);

    // Loop to generate cells for each row
    for(var x = input.minCol[0]; x <= input.maxCol[0]; x++) {
      var newTd = document.createElement("td");
      var textNode = document.createTextNode(x * j);
      newTd.appendChild(textNode);
      lastTr.appendChild(newTd);
    }
  }
}

//jQuery

// Hides the table initially
$('#table').hide();
$(document).ready(function(){
  // Form validation using jQuery validate plugin
  $("#form").validate({
    // declaring the error class so elements appear red
    errorClass: "error",
    // All four look the same except for max column and max row have an added method
    rules: {
      minc: {
        // the field is required to have input
        required: true,
        // the entered text cannot have whitespace
        nowhitespace: true,
        // the field must be a number, opposed to entering characters
        number: true,
        // the range of the input entered must be between -50 and 50
        range: [-50,50],
        onlyIntegers: true
      },
      
      maxc: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        maxcIsLargest: true,
        onlyIntegers: true
      },
      minr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        onlyIntegers: true
      },
      maxr: {
        required: true,        
        nowhitespace: true,
        number: true,
        range: [-50,50],
        maxrIsLargest: true,
        onlyIntegers: true
      }
    },
    // Gets all the input from the input element and generates the tables with it
    submitHandler: function(){
      var input = getInputValues();
      generateTable(input);
    }
  });
});


// User-defined validation methods: ensuring maximum column >= minimum column.

// ensure that the maximum column is larger than or equal to the minimum column
$.validator.addMethod("maxcIsLargest", function(value){
  var input = getInputValues();
  return parseInt(input.minCol[0]) <= parseInt(value);
}, "ERROR: The maximum column value must be greater than or equal to minimum column. Please make sure the maximum is always greater than or equal to minumum.");

// ensure that the maximum column is larger than or equal to the minimum column
$.validator.addMethod("maxrIsLargest", function(value){
  var input = getInputValues();
  return parseInt(input.minRow[0]) <= parseInt(value);
}, "ERROR: The maximum row must be greater than or qual to  minimum row. Please make sure the maximum is always greater than or equal to minumum.");

// ensure that only integers are entered as a value
$.validator.addMethod("onlyIntegers", function(value){
  return !(value.includes('.'));
}, "INVALID ENTRY: No number was entered. Please enter a number between -50 and 50.");


