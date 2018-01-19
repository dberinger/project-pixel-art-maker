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

function addColumns(table, n) {
    var k = 0;
    for (k; k < n; k++) {
        table.find("tr").append("<td></td>");
    }
};

//TODO: add insertRow function to enable user to add a single row to the created grid (table)

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
    addColumns(myTable, width);
};

const myForm = document.querySelector("form");
myForm.addEventListener('submit', function (e) {
    // Prevent the page reload
    e.preventDefault();
    myGrid();
});

myTable.on("click", "td", function () {
    $(this).css("background-color", $("#color").val());
});

myTable.on("dblclick", "td", function () {
    this.css("background-color", "");
});
