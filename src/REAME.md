# Sprint 2 Echo

## Project Details 
Project Name: Echo (Sprint 2)
Team memebers: Richard Dong (rdong14) & Yabeke Zike (yzike)
Repo Link: https://github.com/cs0320-s2023/sprint-2-rdong14-yzike

## Design Choices

My program has one global variable.

### Array \<String> history
This arraylist stores the history of REPL commands and their outputs. This array will be used by renderHTML to update the HTML of the page and allows the program to update the webpage with the proper information. 

My program consists of one typescript file, which contains event handlers for a REPL and a button. 

### prepareButtonClick()
prepareButtonClick() is a helper method that sets up an interactable button in the website. They will go into the HTML and try to find the appropriate HTML elements that they are attatching listeners to, and then attatch the appropriate eventhandlers to them.

### handleButtonClick() 
handleButtonClick() is an event handler method. handleButtonClick will read in the input from the REPL, and call either handleGetRequest or handleStatsRequest to handle the "get" command and the "stats" command. Then, the screen will be updated with renderHTML. 

### handleViewRequest()
handleViewRequest() will handle the get built-in command. It will retrieve the CSV data from mock.json, and print it out using square brackets [] to denote an array, and push that string to the HTML history, where it will then render with renderHTML

### renderHTML()
renderHTML will take the contents of the history arraylist, and update the repl-history div's internal HTML with the contents of the history arraylist. 

### clearHistory()
clearHistory is a public method used in testing to clear the history after each test. 

## Known Bugs

No errors or bugs in implementation found

## Testing

We have one testing suite within our main.test class which thoroughly checks that the functionallity of our echo program fits all the user strories accordingly and looks at differnt edge along with basic cases to test our implementation.

Firslty, we check that submiting and invlaid command that is not one the ones that we have defined throws an error messge to the repl history

Secondly, our next three tests, we look at the functionality of the load fucntion by first testing that it prints the correct html to the repl histroy when a CSV loaded correclty and when the CSV load request is invalid. Then we look at if the load command loads the data of the CSV correctly by using the mock CSVs.

Next, we test the view command functionallity by making sure that we can view a file normally after loading in a CSV and making sure that we see the correct data from the CSV in a table. We also test that the view command does not work when we do not read in a correct CSV.

Then we test our search method, by first looking at the case that there is no CSV to search on which should then throw a message informing the user of that. Then we test that the serach works normally with 2 differnt CSVs to ensure that it works as it should.

Lastly, the rest of our testing class looks at the mode command by first checking that when using every other command they start off in breif mode. Then we look at the mode commnad prints the right message into the repl hisotry, displaying that it is swtiching modes. Then we check that every other command works with the mode swtiching back and forth between verbose and brief and that this switching works along with the fucntionliaty of those commands



## How to run

To start the front-end HTML page, right click on index.html and select "Open with Live Server" which will open a local-run version of the frontent on your default browser. To run the unit tests, make sure you in are in the "sprint1" directory and run "npm test" in the terminal. 