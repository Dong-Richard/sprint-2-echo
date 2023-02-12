# Sprint 1 Echo

**Link to repo**: blahblahblah.github.io

## Design Choices

My program has one global variable.

### Array \<String> history
This arraylist stores the history of REPL commands and their outputs. This array will be used by renderHTML to update the HTML of the page and allows the program to update the webpage with the proper information. 

My program consists of one typescript file, which contains event handlers for a REPL and a button. 

### prepareButtonClick()
prepareButtonClick() is a helper method that sets up an interactable button in the website. They will go into the HTML and try to find the appropriate HTML elements that they are attatching listeners to, and then attatch the appropriate eventhandlers to them.

### handleButtonClick() 
handleButtonClick() is an event handler method. handleButtonClick will read in the input from the REPL, and call either handleGetRequest or handleStatsRequest to handle the "get" command and the "stats" command. Then, the screen will be updated with renderHTML. 

### handleGetRequest()
handleGetRequest() will handle the get built-in command. It will retrieve the CSV data from mock.json, and print it out using square brackets [] to denote an array, and push that string to the HTML history, where it will then render with renderHTML

### handleStatsRequest()
handleStatsRequest() will handle the stats built-in command. It will retrieve the CSV data from mock.json, and print out the number of rows and columns in the CSV, and push that string to the HTML history, where it will then render with renderHTML

### renderHTML()
renderHTML will take the contents of the history arraylist, and update the repl-history div's internal HTML with the contents of the history arraylist. 

### clearHistory()
clearHistory is a public method used in testing to clear the history after each test. 

## Known Bugs

N/a

## Testing

My testing suite has five tests and a beforeEach function. 

### HTML Elements testing
There are two tests that test the validity of certiain HTML elements. The first tests that when things are typed in the repl-command-box, the letters are actually being recieved by the repl. The second confirms that the HTML detects when the submit button is being clicked.

### Logic testing
The program should have the functionality to do three things: output mockedJson's contents upon a get request, output mockedJson's columns and rows upon a stats request, an output an error message upon a submission of anything else. The next three tests each test one of these cases, respectively. 

## How to run

To start the front-end HTML page, right click on index.html and select "Open with Live Server" which will open a local-run version of the frontent on your default browser. To run the unit tests, make sure you in are in the "sprint1" directory and run "npm test" in the terminal. 