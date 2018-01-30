/*jslint browser: true*/
/*global $, jQuery*/
//NOTE: no while loop since Forum Mentors said it's not a requirement
//using .append in loops slows down performance tremendously from what I've read :x

/*TODO:
    * input boxes type number should dynamically update as user add/deletes rows/columns
    * extra 4 buttons for adjusting grid must become hidden/disabled if grid is < 1x1
*/

const myTable = $(".grid");
const myForm = $("form");
const buttons = $(".buttons");
//boolean used in drawing functionalities
let isHolding;
//by default hides extra buttons adjusting grid before submition
buttons.hide();

/*  GRID CREATION FUNCTIONS     */

/**
 * @description Inserts a single row into a specified table
 * @param {Object} tableID - ID of the desired table
 */
function insertRow(tableID) {
    tableID.each(function () {
        //Number of cells in the last row
        let n = $("tr:last td").length;
        let rowStr = "<tr>";
        for (var i = 0; i < n; i++) {
            rowStr += "<td></td>";
        }
        rowStr += "</tr>";
        tableID.append(rowStr);
    });
};

/**
 * @description Inserts a single column into a specified table
 * @param {Object} tableID - ID of the desired table
 */
function insertColumn(tableID) {
    tableID.find("tr").append("<td></td>");
};

/**
 * @description Removes last column from a specified table
 * @param {Object} tableID - ID of the desired table
 */
function removeRow(tableID) {
    tableID.find("tr:last-child").remove();
};

/**
 * @description Removes last row from a specified table
 * @param {Object} tableID - ID of the desired table
 */
function removeColumn(tableID) {
    tableID.find("td:last-child").remove();
};

/**
 * @description Creates a String to be appended to a table to create a table lol
 * @param {number} height - number of rows
 * @param {nubmer} width - number of cells in a row
 * @returns {string} tableStr - final String to create a table
 */
function createTableStr(height, width) {
    let tableStr = "";
    for (var i = 0; i < height; i++) {
        tableStr += "<tr>";
        for (var j = 0; j < width; j++) {
            tableStr += "<td></td>";
        }
        tableStr += "</tr>";
    }
    return tableStr;
}

/**
 * @description Creates a table sized dynamically by the user input
 */
function myGrid() {
    let width = parseInt($("#width").val());
    let height = parseInt($("#height").val());
    myTable.empty();
    myTable.append(createTableStr(height, width));
};

/*   SUBMIT EVENT    */

myForm.on("submit", function (e) {
    //prevent page from refreshing
    e.preventDefault();
    //invoke grid creating function
    myGrid();
    //show extra grid adjusting buttons since now grid exists
    buttons.show();
});

/*   BUTTONS CLICK EVENTS    */

$("#add-row-btn").click(function () {
    insertRow(myTable);
});
$("#del-row-btn").click(function () {
    removeRow(myTable);
});
$("#add-col-btn").click(function () {
    insertColumn(myTable);
});
$("#del-col-btn").click(function () {
    removeColumn(myTable);
});
$("#clear-btn").click(function (){
    $("td").css("background-color","");
});

/*   DRAWING FUNCTIONALITIES     */

//fill cell with picked color on click
myTable.on("click", "td", function () {
    $(this).css("background-color", $("#color").val());
});

//clear cell color on double click
myTable.on("dblclick", "td", function () {
    $(this).css("background-color", "");
});

//sets true that user is holding a mouse button down
myTable.on("mousedown", "td", function (e) {
    /*prevent default because it caused a bug:
    when held click was more of a drag like action,
    it turned to a not-allowed cursor causing the mouse to
    draw infinetely across canvas until user clicked again;
    behavior haven't occured since adding the line below'*/
    e.preventDefault();
    isHolding = true;
});

//while user holds a button cells over which mouse moves will be colored
myTable.on("mousemove", "td", function () {
    if (isHolding) {
        $(this).css("background-color", $("#color").val());
    }
});

//sets false as user let go
myTable.on("mouseup", "td", function () {
    isHolding = false;
});
