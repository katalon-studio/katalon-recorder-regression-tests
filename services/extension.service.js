const { config } = require('../configs/config-env');
const service = require("../jobs/browser.job");
const data = require("../jobs/data.job");

const getPageAndData = async(testsuitePath) => {
    // Define the extension path
    const paths = config.extPath;

    try {
        let browser = await service.getChromiumBrowser(paths);
        let page = await service.openExtension(browser);

        await page.keyboard.press('Escape');
        await page.evaluate(function() {
                let result = {
                    checkLoginData: {
                        recordTimes: 0,
                        playTimes: 0,
                        hasLoggedIn: true,
                        user: "",
                        isActived: true,
                        passedTestCase: 0
                    },
                };
                chrome.storage.local.set(result);
            })
            // await data.removeExistingData(page);

        const htmlFilePath = testsuitePath;
        let sample = await data.loadSampleDataFile(htmlFilePath);
        await data.loadTestSuiteToExtension(page, sample);
        let value1 = await data.loadSampleDataFile('sample/data.csv');
        await data.loadDataFileToExtension(page, 'data.csv', value1);
        let value2 = await data.loadSampleDataFile('sample/todomvc_site.csv');
        await data.loadDataFileToExtension(page, 'todomvc_site.csv', value2);

        return { browser, page };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getPageAndData
}