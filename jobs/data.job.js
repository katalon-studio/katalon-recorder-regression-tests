const fs = require('fs').promises;


async function loadSampleDataFile(filePath) {
    return fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) throw err;
        return Promise.resolve(data);
    });
}

async function removeExistingData(extensionPage) {
    return extensionPage.evaluate(function() {
        document.addEventListener("DOMContentLoaded", function(event) {
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
    });
}


async function loadTestSuiteToExtension(extensionPage, data) {
    return extensionPage.evaluate(function(data) {
        readSuiteFromString(data);
    }, data);
}

module.exports = {
    loadSampleDataFile,
    loadTestSuiteToExtension,
    removeExistingData
}