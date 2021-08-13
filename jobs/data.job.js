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

    /*const module = await extensionPage.evaluate(async function(){
        let module = await import("./js/UI/view/records-grid/record-utils.js");
        return JSON.stringify(Object.keys(module));
    })*/
    let typeOf = "undefined";
    await new Promise(resolve => setTimeout(resolve, 500));
    typeOf = await extensionPage.evaluate(() => typeof document);
    /*throw new Error(JSON.stringify(module));*/


    throw new Error(JSON.stringify(typeOf));

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
    removeExistingData,
    loadDataFileToExtension
}