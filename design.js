/*jslint browser: true*/
/*global $, jQuery*/
//NOTE: no while loop since Forum Mentors said it's not a requirement;
// using .append in loops slows down performance tremendously from what I've read

const myTable = $(".grid");
const myForm = document.querySelector("form");

function insertRow(tableID) {
    tableID.each(function () {
        var $table = $(this);
        // Number of tds in the last table row
        var n = $('tr:last td', this).length;
        var tds = '<tr>';
        for (var i = 0; i < n; i++) {
            tds += '<td></td>';
        }
        tds += '</tr>';
        if ($('tbody', this).length > 0) {
            $('tbody', this).append(tds);
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

function myGrid() {
    let width = parseInt($("#width").val());
    let height = parseInt($("#height").val());
    let tableStr = "";
    myTable.empty();
    // Create rows and colums;
    for (var i = 0; i < height; i++) {
        tableStr += "<tr>";
        for (var j = 0; j < width; j++) {
            tableStr += "<td></td>";
        }
        tableStr += "</tr>";
    }
    myTable.append(tableStr);
};

//TODO: show extra buttons only after submitting

myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    myGrid();
});

$("#add-row-btn").click(function () {
    insertRow(myTable);
});
$("#del-row-btn").click(function(){
    removeRow(myTable);
})
$("#add-col-btn").click(function(){
    insertColumn(myTable);
});
$("#del-col-btn").click(function () {
    removeColumn(myTable);
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
