/*jslint browser: true*/
/*global $, jQuery*/
//NOTE: no while loop since Forum Mentors said it's not a requirement;
// using .append in loops slows down performance tremendously from what I've read :x

const myTable = $(".grid");
const myForm = document.querySelector("form");
const buttons = $(".buttons");
//boolean used in drawing functionalities
let isHolding;
//by default hides extra buttons adjusting grid before submition
buttons.hide();

/*  GRID CREATION FUNCTIONS     */

function insertRow(tableID) {
    tableID.each(function () {
        var $table = $(this);
        // Number of tds in the last table row
        var n = $("tr:last td", this).length;
        var tds = "<tr>";
        for (var i = 0; i < n; i++) {
            tds += "<td></td>";
        }
        tds += "</tr>";
        if ($("tbody", this).length > 0) {
            $("tbody", this).append(tds);
        } else {
            $(this).append(tds);
        }
    });
};

function insertColumn(tableID) {
    tableID.find("tr").append("<td></td>");
};

function removeRow(tableID) {
    tableID.find("tr:last-child").remove();
};

function removeColumn(tableID) {
    tableID.find("td:last-child").remove();
};

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

function myGrid() {
    let width = parseInt($("#width").val());
    let height = parseInt($("#height").val());
    myTable.empty();
    myTable.append(createTableStr(height, width));
};

/*   SUBMIT EVENT    */

myForm.addEventListener("submit", function (e) {
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
})
$("#add-col-btn").click(function () {
    insertColumn(myTable);
});
$("#del-col-btn").click(function () {
    removeColumn(myTable);
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
