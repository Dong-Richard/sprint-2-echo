function loadCSV(filepath) {
    var data = dataMap.get(filepath);
    if (data) {
        currentCSV = data;
        return 1;
    }
    else {
        return 0;
    }
}
var currentCSV = [];
var csvData1 = [
    [1, 2, 3, 4, 5],
    ["The", "song", "remains", "the", "same."],
];
var csvData2 = [
    ["First Name", "Last Name", "Class", "Role"],
    ["Nim", "Telson", "CSCI 0320", "Student"],
    ["Tim", "Nelson", "CSCI 0320", "Student"]
];
var dataMap = new Map();
dataMap.set("mockedData1.csv", csvData1);
dataMap.set("mockedData2.csv", csvData2);
export { loadCSV, currentCSV };
