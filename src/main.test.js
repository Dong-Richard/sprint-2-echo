// all exports from main will now be available as main.X
import * as main from './main';
import * as mock from './mockedJson.js';
var startHTML = "<div class=\"repl\">\n        <div class = \"repl-history-class\" id = \"repl-history\">            \n        </div>\n        <hr>\n        <div class=\"repl-input\">\n            <input type=\"text\" class = \"repl-command-box-class\" id =\"repl-command-box\" placeholder = \"Enter command here!\">\n        </div>\n        <button type cd= \"button\" class = \"button-class\" id = \"submit-button\"> Submit </button>\n    </div>\n<script type=module src=\"../src/main.js\"></script>";
beforeEach(function () {
    main.clearHistory();
    mock.resetCSV();
    document.body.innerHTML = startHTML;
});
test('handleLoadRequest', function () {
    var maybeInput = document.getElementById("repl-command-box");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "load_csv mockedData1.csv";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe('<p>CSV Loaded Successfully</p>');
    }
    var csvData = [
        [1, 2, 3, 4, 5],
        ["The", "song", "remains", "the", "same."],
    ];
    expect(mock.currentCSV).toEqual(csvData);
});
test('loadCSV', function () {
    var csvData = [];
    expect(mock.currentCSV).toEqual(csvData);
    mock.loadCSV("mockedData1.csv");
    csvData = [
        [1, 2, 3, 4, 5],
        ["The", "song", "remains", "the", "same."],
    ];
    expect(mock.currentCSV).toEqual(csvData);
    mock.loadCSV("mockedData2.csv");
    csvData = [
        ["First Name", "Last Name", "Class", "Role"],
        ["Nim", "Telson", "CSCI 0320", "Student"],
        ["Tim", "Nelson", "CSCI 0320", "Student"],
    ];
    expect(mock.currentCSV).toEqual(csvData);
});
/**
 * Test that view requests work
 */
test('handleViewRequest', function () {
    var maybeInput = document.getElementById("repl-command-box");
    //we need to load the csv before viewing it
    mock.loadCSV("mockedData1.csv");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "view";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Output: </p><table class=\"table\"><tbody><tr><td class=\"table\">1</td><td class=\"table\">2</td>" +
            "<td class=\"table\">3</td><td class=\"table\">4</td><td class=\"table\">5</td></tr><tr><td class=\"table\">The</td>" +
            "<td class=\"table\">song</td><td class=\"table\">remains</td><td class=\"table\">the</td><td class=\"table\">same.</td></tr></tbody></table><p></p>");
    }
});
/**
 * Tests that invalid requests work
 */
test('handleInvalidRequest', function () {
    var maybeInput = document.getElementById('repl-command-box');
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "something invalid";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Output: Not a valid command</p>");
    }
});
