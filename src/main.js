import { loadCSV, getCSV, searchCSV } from "./mockedJson.js";
var history = [];
// The window.onload callback is invoked when the window is first loaded by the browser
window.onload = function () {
    // If you're adding an event for a button click, do something similar.
    // The event name in that case is "click", not "keypress", and the type of the element
    // should be HTMLButtonElement. The handler function for a "click" takes no arguments.
    prepareButtonClick();
};
/**
 * Function to prepare the event handler for the submit button. It retrieves the button from
 * the HTML and checks if it is the correct button, before attatching the eventListener to
 * the button.
 *
 * @returns: void
 * @param: none
 */
function prepareButtonClick() {
    var button = document.getElementById("submit-button");
    if (button == null) {
        console.log("Couldn't find input element");
    }
    else if (!(button instanceof HTMLButtonElement)) {
        console.log("Found element ".concat(button, ", but it wasn't an button"));
    }
    else {
        // Notice that we're passing *THE FUNCTION* as a value, not calling it.
        // The browser will invoke the function when a key is pressed with the input in focus.
        //  (This should remind you of the strategy pattern things we've done in Java.)
        button.addEventListener("click", handleButtonClick);
    }
}
/**
 * The event handler for the submit button. If the text in the REPL field is "get", it will print out the
 * contents of mock.json, and if the text is "stats" it will print out the number of rows and columns
 * in the equivalent CSV. Otherwise, an error will output.
 *
 * @returns: void
 * @param: none
 */
function handleButtonClick() {
    var maybeInput = document.getElementById("repl-command-box");
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLInputElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an button"));
    }
    else {
        var command = maybeInput.value.split(" ")[0];
        if (command === "view") {
            handleViewRequest(maybeInput.value);
        }
        else if (command === "search") {
            handleSearchRequest(maybeInput.value);
        }
        else if (command === "mode") {
            handleModeRequest();
        }
        else if (command === "load_csv") {
            handleLoadRequest(maybeInput.value);
        }
        else {
            var historyOutput = new Array();
            if (mode == 1) {
                historyOutput.push("<p>Command:" + maybeInput.value + "</p>");
            }
            historyOutput.push("<p>Output: Not a valid command</p>");
            history.push(historyOutput);
        }
        renderHTML();
    }
}
/**
 * This stuff is just copied over from Tim's site ^
 */
/**
 * This is a helper fucntion that is used with view command as it takes the CSV data and orgnaizes it into an html table
 * string which is then returned by this function
 * @returns: this function returns the html table string
 */
function tableConverter() {
    var result = "<table class = 'table'>";
    getCSV().forEach(function (output) {
        result += "<tr>";
        output.forEach(function (thing) {
            result += "<td class = 'table'>" + thing + "</td>";
        });
        result += "</tr>";
    });
    result += "</table>";
    return result;
}
/**
 * A helper function to handle a get request. It will build a string with brackets denoting the contents of the
 * 2D array, and push it to the console history.
 *
 * @returns: void
 * @param: Input string to the command terminal, the string will be used to get the file path of the csv to be printed.
 */
function handleViewRequest(input) {
    var historyOutput = new Array();
    if (mode == 1) {
        historyOutput.push("<p>Command: ".concat(input, "</p>"));
    }
    var output = '';
    if (mode == 1) {
        output = '<p>Output: </p>';
    }
    else {
        output = '';
    }
    if (getCSV().length != 0) {
        historyOutput.push(output + tableConverter());
    }
    else {
        historyOutput.push("<p>No CSV Loaded!</p>");
    }
    history.push(historyOutput);
}
//mode 0 is brief, mode 1 is verbose
var mode = 0;
/**
 * A helper function to handle a mode request. It will change the mode variable from 0 to 1 or 1 to 0, with 0 representing
 * brief mode and 1 representing verbose mode. It will then output a message to the terminal to signify what mode it has
 * been changed to.
 *
 * @returns: void
 */
function handleModeRequest() {
    if (mode == 0) {
        mode = 1;
        var historyOutput = new Array("<p>Changed to verbose mode</p>");
        history.push(historyOutput);
    }
    else {
        mode = 0;
        var historyOutput = new Array("<p>Changed to brief mode</p>");
        history.push(historyOutput);
    }
}
/**
 * A helper function to handle a load_csv request. It will look through a database (in this case its mocked) and if it finds
 * the file specified, it will load the data into memory, and return a success error code, and return a failure error code
 * otherwise.
 *
 * @param input The filepath to be found
 */
function handleLoadRequest(input) {
    var historyOutput = new Array();
    if (mode == 1) {
        historyOutput.push("<p>Command: ".concat(input, "</p>"));
    }
    if (loadCSV(input.split(" ")[1])) {
        historyOutput.push("<p>CSV Loaded Successfully</p>");
    }
    else {
        historyOutput.push("<p>CSV filepath not found</p>");
    }
    history.push(historyOutput);
}
/**
 * This is the search function that is called by when the command search is entered into field. As of right now
 * it is a mocked version as we havent input the backend fucntionlity but what this function does for now is
 * check if the csv is loaded in, and if it is not we send message to the user that we have not recived a csv
 * yet. Otherwise is the CSV is loaded in, we just print the first row of that csv no matter what to mock
 * what this fucntion would do
 */
function handleSearchRequest(input) {
    var historyOutput = new Array();
    if (mode == 1) {
        var modeChange = "<p>Command: ".concat(input, "</p>");
        historyOutput.push(modeChange);
    }
    var output = '';
    if (mode == 1) {
        output = '<p>Output: ';
    }
    else {
        output = '<p>';
    }
    if (getCSV().length != 0) {
        output += searchCSV() + "</p>";
    }
    else {
        output +=
            "Sorry we could not find a CSV file to serach :(, please try again</p>";
    }
    historyOutput.push(output);
    history.push(historyOutput);
}
/**
 * Handle other User Stories here:
 */
/**
 * A helper function that renders the output onto the screen. It will update the internal HTML of the div that
 * represents the console history.
 *
 * @returns void
 * @param: none
 */
function renderHTML() {
    var newHtml = "";
    // For every guess array in GUESSES...
    history.forEach(function (output) {
        output.forEach(function (line) {
            newHtml += "".concat(line);
        });
    });
    // Replace the contents of the old-rounds <div> with the HTML we generated above
    // Since I prefer not to use "id" and use "class" instead here, we have to do [0]...
    var oldREPLHistory = document.getElementById("repl-history");
    if (oldREPLHistory == null) {
        console.log("Could not find old-REPL element");
        return;
    }
    else if (!(oldREPLHistory instanceof HTMLElement)) {
        console.log("first old-REPL element was not an HTMLElement");
        return;
    }
    else {
        oldREPLHistory.innerHTML = newHtml;
    }
}
function clearHistory() {
    history = [];
    mode = 0;
}
// Provide this to other modules (e.g., for testing!)
// The configuration in this project will require /something/ to be exported.
export { handleButtonClick, clearHistory };
