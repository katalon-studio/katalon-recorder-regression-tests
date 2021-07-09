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
    return extensionPage.evaluate(function(data) {
        readSuiteFromString(data);
        return Promise.resolve(sideex_testCase);
    }, data);
}

module.exports = {
    loadSampleDataFile,
    loadTestSuiteToExtension,
    removeExistingData
}