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
                browser.storage.local.set(result);
            })
            // await data.removeExistingData(page);

        const htmlFilePath = testsuitePath;
        let sample = await data.loadSampleDataFile(htmlFilePath);
        let testCases = await data.loadTestSuiteToExtension(page, sample);

        return { browser, page, testCases };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getPageAndData
}