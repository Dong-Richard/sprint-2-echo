/**
 * Loads a CSV from the database into memory. In the real program, this is where it would search through the 
 * database and parse into an array for usage in the main program.
 * 
 * @param filepath : The filepath to the CSV to be read
 * 
 * @returns 
 */
function loadCSV(filepath: string): Number{
    let data = dataMap.get(filepath)
    if(data){
        currentCSV = data
        return 1
    }else{
        return 0
    }
}

//The current CSV stored in memory
var currentCSV: (Number | String)[][] = []


//Mock datasets and map
const csvData1 = [
  [1, 2, 3, 4, 5],
  ["The", "song", "remains", "the", "same."],
];

const csvData2 = [
    ["First Name", "Last Name", "Class", "Role"],
    ["Nim", "Telson", "CSCI 0320", "Student"],
    ["Tim", "Nelson", "CSCI 0320", "Student"]
];

const dataMap = new Map<String, (String | Number)[][]>()
dataMap.set("mockedData1.csv", csvData1)
dataMap.set("mockedData2.csv", csvData2)


//Reset memory for testing purposes
function resetCSV() {
    currentCSV = []
}

//getter method for currentCSV, avoid exposing the array
function getCSV(): (Number | String) [][]{
    return currentCSV
}

/**
 * placeholder function for search, it should call the backend and return a 2D array. 
 * 
 * @param input The input string, which should contain the column and value to search for. Here, it does nothing. 
 * @returns The search result for search
 */
function searchCSV(input: string): (Number | String)[][] {
    let result: (Number | String)[][] = []
    result.push(currentCSV[0])
    return result
}

export {loadCSV, resetCSV, getCSV, searchCSV}