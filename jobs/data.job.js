const fs = require('fs').promises;


async function loadSampleDataFile(filePath) {
    return fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) throw err;
        return Promise.resolve(data);
    });
}

async function removeExistingData(extensionPage) {
    return extensionPage.evaluate(function() {
        remove_testSuite();
        sideex_wait = {
            next_command_wait: false,
            done: true
        };
        sideex_testCase = {
            count: 0
        };

        sideex_testSuite = {
            count: 0
        };
    });
}


async function loadTestSuiteToExtension(extensionPage, data) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return extensionPage.evaluate(async function(data) {
        window.open("www.google.com");
        readSuiteFromString(data);
    }, data);
}

async function loadDataFileToExtension(extensionPage, name, value) {
    return extensionPage.evaluate(function(value, name) {
        dataFiles[name] = {
            content: value,
            type: 'csv'
        };
        saveDataFiles();
    }, value, name);
}

module.exports = {
    loadSampleDataFile,
    loadTestSuiteToExtension,
    removeExistingData,
    loadDataFileToExtension
}