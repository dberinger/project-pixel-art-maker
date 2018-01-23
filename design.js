/*jslint browser: true*/
/*global $, jQuery*/

//NOTE: no while loop since Forum Mentors said it's not a requirement

const myTable = $(".grid");

function addRows(table, n) {

    var i = 0;
    for (i; i < n; i++) {
        table.append("<tr></tr>");
    }
};

function addCells(table, n) {
    var k = 0;
    for (k; k < n; k++) {
        $("tr").append("<td></td>");
    }
};

//TODO: add insertRow function to enable user to add a single row to the created grid (table)

function insertRow() {
    addRows(myTable,1);
    addCells(myTable,parseInt(10));
};

function insertColumn() {
    $("tr").append("<td></td>");
};

function removeRow() {
    $("tr:last-child").remove();
};

function removeColumn() {
    $("td:last-child").remove();
};

function myGrid() {
    let width = parseInt($("#width").val());
    let height = parseInt($("#height").val());

    myTable.empty();
    addRows(myTable, height);
    addCells(myTable, width);
};

//TODO: show extra buttons only after submitting

const myForm = document.querySelector("form");
myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    myGrid();
});

myTable.on("click", "td", function () {
    $(this).css("background-color", $("#color").val());
});

//TODO: improve coloring while holding with mouse + doesn't work on mobile
myTable.on("dragover", "td", function () {
    $(this).css("background-color", $("#color").val());
});

myTable.on("dblclick", "td", function () {
    this.css("background-color", "");
});
