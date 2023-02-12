// all exports from main will now be available as main.X
import * as main from './main';

const startHTML = 
`<div class="repl">
        <div class = "repl-history-class" id = "repl-history">            
        </div>
        <hr>
        <div class="repl-input">
            <input type="text" class = "repl-command-box-class" id ="repl-command-box" placeholder = "Enter command here!">
        </div>
        <button type cd= "button" class = "button-class" id = "submit-button"> Submit </button>
    </div>
<script type=module src="../src/main.js"></script>`

beforeEach( () => {
  main.clearHistory()
  document.body.innerHTML = startHTML
})



/**
 * Test that get requests work
 */
test('handleGetRequest', () => {
  var maybeInput = document.getElementById('repl-command-box');
    // Assumption: there's only one thing
  if(maybeInput instanceof HTMLInputElement){
    maybeInput.value = "get something.csv"
  }
  main.handleButtonClick()
  var replHistory = document.getElementById("repl-history");
  if(replHistory instanceof HTMLElement){
    expect(replHistory.innerHTML.trim()).toBe("<p>Command: get something.csv</p><p>Output: [[1,2,3,4,5],[\"The\",\"song\",\"remains\",\"the\",\"same.\"]]</p>")
  }
})

/**
 * Tests that invalid requests work
 */
test('handleInvalidRequest', () => {
  var maybeInput = document.getElementById('repl-command-box');
    // Assumption: there's only one thing
  if(maybeInput instanceof HTMLInputElement){
    maybeInput.value = "something invalid"
  }
  main.handleButtonClick()
  var replHistory = document.getElementById("repl-history");
  if(replHistory instanceof HTMLElement){
    expect(replHistory.innerHTML.trim()).toBe("<p>Command: something invalid</p><p>Output: Not a valid command</p>")
  }
})


