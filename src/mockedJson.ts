function loadCSV(filepath: string): Number{
    let data = dataMap.get(filepath)
    if(data){
        currentCSV = data
        return 1
    }else{
        return 0
    }
}

var currentCSV: (Number | String)[][] = []

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

function resetCSV() {
    currentCSV = []
}

export {loadCSV, resetCSV, currentCSV}