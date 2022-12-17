// Zheng Lin Lei

// github: https://github.com/ZhengLinLei/json2csv

const json2csv = (json, del=",") => {
    del = del || ",";
    // Check if json is string
    if (typeof json == "string") json = JSON.parse(json);
    // Check if json is an array
    if (!Array.isArray(json)) {
        throw new Error("First argument must be an array");
        return;
    }
    // Get all keys
    const keys = Object.keys(json[0]);
    // Check if all keys are the same
    // Create csv
    let csv = `${keys.join(del)}\n`;
    json.forEach(row => {
        if(Object.keys(row).toString() != keys.toString()) {
            throw new Error("All objects must have the same keys");
            return;
        }
        const values = Object.values(row).join(del);
        csv += `${values}\n`;
    });

    return csv;
};


// For node.js
if (typeof module !== "undefined") module.exports = json2csv;