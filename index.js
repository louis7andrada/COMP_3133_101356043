const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Function to check and delete files if they exist
function deleteIfExists(filename) {
    if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
    }
}

// Delete 'canada.txt' and 'usa.txt' if they exist
deleteIfExists('canada.txt');
deleteIfExists('usa.txt');

// Function to write data to a file
function writeToTextFile(filename, rows) {
    const csvWriter = createCsvWriter({
        path: filename,
        header: [
            { id: 'country', title: 'country' },
            { id: 'year', title: 'year' },
            { id: 'population', title: 'population' }
        ]
    });

    csvWriter
        .writeRecords(rows) // returns a promise
        .then(() => {
            console.log(`The file ${filename} was written successfully`);
        });
}

// Read the csv file and filter data
let canadaData = [];
let usaData = [];

fs.createReadStream('input_countries.csv')
    .pipe(csvParser())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            canadaData.push(row);
        } else if (row.country === 'United States') {
            usaData.push(row);
        }
    })
    .on('end', () => {
        // Write to files
        writeToTextFile('canada.txt', canadaData);
        writeToTextFile('usa.txt', usaData);
    });
