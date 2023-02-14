import { getCSV } from "./mockedJson.js"

let history: Array<Array<string>> = []

// The window.onload callback is invoked when the window is first loaded by the browser
window.onload = () => {     
    
    // If you're adding an event for a button click, do something similar.
    // The event name in that case is "click", not "keypress", and the type of the element 
    // should be HTMLButtonElement. The handler function for a "click" takes no arguments.
    prepareButtonClick()
}

/**
 * Function to prepare the event handler for the submit button. It retrieves the button from
 * the HTML and checks if it is the correct button, before attatching the eventListener to
 * the button. 
 * 
 * @returns: void
 * @param: none
 */
function prepareButtonClick() {
    const button: HTMLElement | null = document.getElementById('submit-button')

    if(button == null) {
        console.log("Couldn't find input element")
    } else if(!(button instanceof HTMLButtonElement)) {
        console.log(`Found element ${button}, but it wasn't an button`)
    } else {
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
    const maybeInput: HTMLElement | null = document.getElementById('repl-command-box')

    if(maybeInput == null) {
        console.log("Couldn't find input element")
    } else if(!(maybeInput instanceof HTMLInputElement)) {
        console.log(`Found element ${maybeInput}, but it wasn't an button`)
    } else {
        let command: string = maybeInput.value.split(" ")[0];
        if(command === "get"){
            handleGetRequest(maybeInput.value)
        }else if (command === "mode"){
            handleModeRequest()
        }else{
            let historyOutput: Array<string> = new Array()
            if(mode == 1){
                historyOutput.push("Command: " + maybeInput.value)
            }
            historyOutput.push("Output: Not a valid command")
            history.push(historyOutput)
        }
        renderHTML()
    }
}

/**
 * This stuff is just copied over from Tim's site ^
 */

/**
 * A helper function to handle a get request. It will build a string with brackets denoting the contents of the 
 * 2D array, and push it to the console history. 
 * 
 * @returns: void
 * @param: Input string to the command terminal, the string will be used to get the file path of the csv to be printed. 
 */
function handleGetRequest(input: string) {
    let historyOutput: Array<string> = new Array()
    if (mode == 1){
        historyOutput.push(`Command: ${input}`);
    }
    historyOutput.push("Output: " + JSON.stringify(getCSV()));
    history.push(historyOutput)
}

//mode 0 is brief, mode 1 is verbose
var mode = 0

/**
 * A helper function to handle a mode request. It will change the mode variable from 0 to 1 or 1 to 0, with 0 representing
 * brief mode and 1 representing verbose mode. It will then output a message to the terminal to signify what mode it has 
 * been changed to. 
 * 
 * @returns: void
 */
function handleModeRequest(){
    if(mode == 0){
        mode = 1
        let historyOutput: Array<string> = new Array("Changed to verbose mode")
        history.push(historyOutput)
    }else{
        mode = 0
        let historyOutput: Array<string> = new Array("Changed to brief mode");
        history.push(historyOutput);
    }
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
    let newHtml: string = ''    

    // For every guess array in GUESSES...
    history.forEach((output: Array<string>) => {
        output.forEach((line: string) => {
            newHtml += `<p>${line}</p>`
        })
    })

    // Replace the contents of the old-rounds <div> with the HTML we generated above    
    // Since I prefer not to use "id" and use "class" instead here, we have to do [0]...
    const oldREPLHistory: HTMLElement | null = document.getElementById('repl-history')
    if(oldREPLHistory == null) {    
        console.log('Could not find old-REPL element')
        return
    }else if(!(oldREPLHistory instanceof HTMLElement)) {
        console.log('first old-REPL element was not an HTMLElement')
        return
    }else {
        oldREPLHistory.innerHTML = newHtml    
    }
}

function clearHistory() {
    history = []
}


// Provide this to other modules (e.g., for testing!)
// The configuration in this project will require /something/ to be exported.
export {handleButtonClick, clearHistory}
