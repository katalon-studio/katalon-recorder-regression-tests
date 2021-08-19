const fs = require('fs').promises;


async function loadSampleDataFile(filePath) {
    return fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) throw err;
        return Promise.resolve(data);
    });
}

async function loadTestSuiteToExtension(extensionPage, data) {
    await extensionPage.waitForFunction(`typeof window.readSuiteFromString === "function"`,
      {polling: 500});
    return extensionPage.evaluate(async function(data) {
        window.readSuiteFromString(data);
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
    loadDataFileToExtension
}