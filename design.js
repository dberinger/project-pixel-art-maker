/*jslint browser: true*/
/*global $, jQuery*/

//NOTE: no while loop since Forum Mentors said it's not a requirement

const myTable = $(".grid");

function addRows(table, n) {

    for (var i = 0; i < n; i++) {
        table.append("<tr></tr>");
    }
};

//TODO: add insertRow function to enable user to add a single row to the created grid (table)

function insertColumn() {
    $("tr").append("<td></td>");
};

function addColumns(table, n) {
    for (var k = 0; k < n; k++) {
        table.find("tr").append("<td></td>");
    }
};

function removeRow() {
    $("tr:last-child").remove();
};

function removeColumn() {
    $("td:last-child").remove();
};

function clearTable() {
    $("tr,td").remove();
};

function myGrid() {
    let width = parseInt($("#width").val());
    let height = parseInt($("#height").val());

    clearTable();
    addRows(myTable, height);
    addColumns(myTable, width);    

    let cells = $("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function () {
            $(this).css("background-color", $("#color").val());
        });
    }
    console.log(width + " " + height + " " + "cells: " + cells.length);
};
