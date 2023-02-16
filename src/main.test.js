// all exports from main will now be available as main.X
import * as main from './main';
import * as mock from './mockedJson.js';
var startHTML = "<div class=\"repl\">\n        <div class = \"repl-history-class\" id = \"repl-history\">            \n        </div>\n        <hr>\n        <div class=\"repl-input\">\n            <input type=\"text\" class = \"repl-command-box-class\" id =\"repl-command-box\" placeholder = \"Enter command here!\">\n        </div>\n        <button type cd= \"button\" class = \"button-class\" id = \"submit-button\"> Submit </button>\n    </div>\n<script type=module src=\"../src/main.js\"></script>";
beforeEach(function () {
    main.clearHistory();
    mock.resetCSV();
    document.body.innerHTML = startHTML;
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
/**
 * Tests that load requests print the correct html
 */
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
    expect(mock.getCSV()).toEqual(csvData);
});
/**
 * Tests that an invalid load request prints the correct error message
 */
test('invalid load request', function () {
    var maybeInput = document.getElementById("repl-command-box");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "load_csv not real filepath";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>CSV filepath not found</p>");
    }
});
/**
 * Tests that loadCSV loads the correct csv given a filepath
 */
test('loadCSV', function () {
    var csvData = [];
    expect(mock.getCSV()).toEqual(csvData);
    mock.loadCSV("mockedData1.csv");
    csvData = [
        [1, 2, 3, 4, 5],
        ["The", "song", "remains", "the", "same."],
    ];
    expect(mock.getCSV()).toEqual(csvData);
    mock.loadCSV("mockedData2.csv");
    csvData = [
        ["First Name", "Last Name", "Class", "Role"],
        ["Nim", "Telson", "CSCI 0320", "Student"],
        ["Tim", "Nelson", "CSCI 0320", "Student"],
    ];
    expect(mock.getCSV()).toEqual(csvData);
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
        expect(replHistory.innerHTML.trim()).toBe("<table class=\"table\"><tbody><tr><td class=\"table\">1</td><td class=\"table\">2</td>" +
            "<td class=\"table\">3</td><td class=\"table\">4</td><td class=\"table\">5</td></tr><tr><td class=\"table\">The</td>" +
            "<td class=\"table\">song</td><td class=\"table\">remains</td><td class=\"table\">the</td><td class=\"table\">same.</td></tr></tbody></table>");
    }
});
/**
 * Tests that view when no csv is loaded prints the correct error message
 */
test('invalid view request', function () {
    var maybeInput = document.getElementById("repl-command-box");
    //we need to load the csv before viewing it
    mock.loadCSV("not real");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "view";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>No CSV Loaded!</p>");
    }
});
/**
 * Tests that seraching works when there is no CSV sends the right message
 */
test('handleNoCSVSearch', function () {
    var maybeInput = document.getElementById('repl-command-box');
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "search";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Sorry we could not find a CSV file to serach :(, please try again</p>");
    }
});
/**
 * Tests that seraching works normally when the CSV is loaded
 */
test('handleNormalSearch', function () {
    var maybeInput = document.getElementById('repl-command-box');
    //we need to load the csv
    mock.loadCSV("mockedData1.csv");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "search";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>1,2,3,4,5</p>");
    }
});
/**
 * Tests that seraching works normally when the CSV is loaded part 2
 */
test('handleNormalSearch2', function () {
    var maybeInput = document.getElementById('repl-command-box');
    //we need to load csv
    mock.loadCSV("mockedData2.csv");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "search";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>First Name,Last Name,Class,Role</p>");
    }
});
/**
 * Tests that the mode starts off as breif with the load command
 */
test('handleModeLoadStartBrief', function () {
    var maybeInput = document.getElementById('repl-command-box');
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "load_csv mockedData1.csv";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>CSV Loaded Successfully</p>");
    }
});
/**
 * Tests that the mode starts off as breif with the view command
 */
test('handleModeViewStartBrief', function () {
    var maybeInput = document.getElementById('repl-command-box');
    mock.loadCSV("mockedData1.csv");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "view";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<table class=\"table\"><tbody><tr><td class=\"table\">1</td><td class=\"table\">2</td><td" +
            " class=\"table\">3</td><td class=\"table\">4</td><td class=\"table\">5</td></tr><tr><td class=\"table\">" +
            "The</td><td class=\"table\">song</td><td class=\"table\">remains</td><td class=\"table\">the</td><td" +
            " class=\"table\">same.</td></tr></tbody></table>");
    }
});
/**
 * Tests that the mode starts off as breif with the search command
 */
test('handleModeViewStartBrief', function () {
    var maybeInput = document.getElementById('repl-command-box');
    //load in csv
    mock.loadCSV("mockedData1.csv");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "search";
    }
    main.handleButtonClick();
    var replHistory = document.getElementById("repl-history");
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>1,2,3,4,5</p>");
    }
});
/**
 * Tests that the mode command swtiches between breif and verbose
 */
test('handleModeSwitches', function () {
    var maybeInput = document.getElementById('repl-command-box');
    var replHistory = document.getElementById("repl-history");
    mock.loadCSV("mockedData1.csv");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleButtonClick();
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Changed to verbose mode</p>");
    }
});
/**
 * Tests when we swtich between verbose and breif when using the load command
 */
test('handleLoadModeChange', function () {
    var maybeInput = document.getElementById('repl-command-box');
    var replHistory = document.getElementById("repl-history");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleButtonClick();
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "load_csv mockedData1.csv";
    }
    main.handleButtonClick();
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Changed to verbose mode</p>" +
            "<p>Command: load_csv mockedData1.csv</p><p>CSV Loaded Successfully</p>");
    }
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleButtonClick();
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Changed to verbose mode</p>" +
            "<p>Command: load_csv mockedData1.csv</p><p>CSV Loaded Successfully</p><p>Changed to brief mode</p>");
    }
});
/**
 * Tests when we swtich between verbose and breif when using the search command
 */
test('handleSearchModeChange', function () {
    var maybeInput = document.getElementById('repl-command-box');
    var replHistory = document.getElementById("repl-history");
    mock.loadCSV("mockedData1.csv");
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleButtonClick();
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "search";
    }
    main.handleButtonClick();
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Changed to verbose mode</p>" +
            "<p>Command: search</p><p>Output: 1,2,3,4,5</p>");
    }
    //Switching it back to brief
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleButtonClick();
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "search";
    }
    main.handleButtonClick();
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Changed to verbose mode</p>" +
            "<p>Command: search</p><p>Output: 1,2,3,4,5</p>" +
            "<p>Changed to brief mode</p>" +
            "<p>1,2,3,4,5</p>");
    }
});
/**
 * Tests when we swtich between verbose and breif when using the view command
 */
test('handleViewModeChange', function () {
    var maybeInput = document.getElementById('repl-command-box');
    var replHistory = document.getElementById("repl-history");
    mock.loadCSV("mockedData1.csv");
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleButtonClick();
    // Assumption: there's only one thing
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "view";
    }
    main.handleButtonClick();
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Changed to verbose mode</p>" +
            "<p>Command: view</p><p>Output: </p><table class=\"table\"><tbody><tr><td class=\"table\">1</td>" +
            "<td class=\"table\">2</td><td class=\"table\">3</td><td class=\"table\">4</td><td class=\"table\">" +
            "5</td></tr><tr><td class=\"table\">The</td><td class=\"table\">song</td><td class=\"table\">remains" +
            "</td><td class=\"table\">the</td><td class=\"table\">same.</td></tr></tbody></table>");
    }
    //Switching it back to brief
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "mode";
    }
    main.handleButtonClick();
    if (maybeInput instanceof HTMLInputElement) {
        maybeInput.value = "view";
    }
    main.handleButtonClick();
    if (replHistory instanceof HTMLElement) {
        expect(replHistory.innerHTML.trim()).toBe("<p>Changed to verbose mode</p>" +
            "<p>Command: view</p><p>Output: </p><table class=\"table\"><tbody><tr><td class=\"table\">1</td>" +
            "<td class=\"table\">2</td><td class=\"table\">3</td><td class=\"table\">4</td><td class=\"table\">" +
            "5</td></tr><tr><td class=\"table\">The</td><td class=\"table\">song</td><td class=\"table\">remains</td>" +
            "<td class=\"table\">the</td><td class=\"table\">same.</td></tr></tbody></table><p>Changed to brief mode</p>" +
            "<table class=\"table\"><tbody><tr><td class=\"table\">1</td><td class=\"table\">2</td><td class=\"table\"" +
            ">3</td><td class=\"table\">4</td><td class=\"table\">5</td></tr><tr><td class=\"table\">The</td><td class=\"table\">song</td>" +
            "<td class=\"table\">remains</td><td class=\"table\">the</td><td class=\"table\">same.</td></tr></tbody></table>");
    }
});
