# Sprint 2 Echo

**Link to repo**: https://github.com/cs0320-s2023/sprint-2-rdong14-yzike

## Design Choices

Our program has three global variable.

### Array \<String> history
This arraylist stores the history of REPL commands and their outputs. This array will be used by renderHTML to update the HTML of the page and allows the program to update the webpage with the proper information. 

### Number mode
This stores whether the program is in brief mode or verbose mode, 1 for verbose, 0 for brief.

### (Number | String)[][] currentCSV
Array which locally stores the loaded csv in memory. 

Our program consists of one typescript file, which contains event handlers for a REPL and a button. 

### prepareButtonClick()
prepareButtonClick() is a helper method that sets up an interactable button in the website. They will go into the HTML and try to find the appropriate HTML elements that they are attatching listeners to, and then attatch the appropriate eventhandlers to them.

### handleButtonClick() 
handleButtonClick() is an event handler method. handleButtonClick will read in the input from the REPL, and call handleViewRequest(), handleModeRequest(), handleSearchRequest(), or handleLoadRequest() depending on which is typed into the REPL. If none of the commands are called, then an error message should print. 

### handleViewRequest()
handleViewRequest() will handle the get built-in command. It will retrieve the CSV data from the CSV loaded in the memory array, and print it out as an HTML table. To get the string for the table, we call the helper method tableConverter()

### handleSearchRequest() 
handleSearchRequest would call the backend to search through the loaded csv for all rows that contain a certain value. In this project, because its purely frontend, we dont actually search through the CSV, and will just print the first row as a placeholder for calling the backend.

### handleModeRequest()
handleModeRequest will change the mode between brief and verbose mode. To do this, it switches a global variable "mode" between 0 and 1.

### handleLoadRequest()
handleLoadRequest will load the csv with the specified filepath to memory. This will be in an array in mockedJson, called "currentCSV"

### renderHTML()
renderHTML will take the contents of the history arraylist, and update the repl-history div's internal HTML with the contents of the history arraylist. 

### clearHistory()
clearHistory is a public method used in testing to clear the history after each test. 

### tableConverter()
tableConverter is a helper method that will generate the HTML for a table containing the data in currentCSV. 

## Known Bugs

N/a

## Testing

My testing suite has five tests and a beforeEach function. 

### HTML Elements testing
[something here, idk if we actually need to test this]

### Logic testing
The program should have the functionality to do [a certain number of] things: output mockedJson's contents upon a get request, and output an error message upon a submission of anything else. The next three tests each test one of these cases, respectively. 

## How to run

To start the front-end HTML page, right click on index.html and select "Open with Live Server" or "Run" which will open a local-run version of the frontent on your default browser. To run the unit tests, make sure you in are in the "sprint1" directory and run "npm test" in the terminal. 