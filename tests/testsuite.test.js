const ExtensionService = require('../services/extension.service');
const TestSuiteService = require('../services/testsuite.service');

describe("Run test suite", () => {
    let browser;
    afterEach(async () => {
        if (browser){
            await browser.close();
            browser = undefined;
        }
    })
    it("Users can execute a test suite with Play Suite", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        browser = extension.browser;
        let result = await TestSuiteService.runTestSuite(extension.page);
        await expect(result).toMatchObject({ pass: 14, fail: 2 });

    }, 200000);

    it("Users can execute all suites with Play All", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        browser = extension.browser;
        let result = await TestSuiteService.runAllTestSuites(extension.page);
        await expect(result).toMatchObject({ pass: 14, fail: 2 });

    }, 200000)

    it("Run a test suite from specified test case", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        browser = extension.browser;
        let result = await TestSuiteService.runFromSpecifiedTestcase(extension.page);
        expect(result).toMatchObject({ pass: 13, fail: 2 });

    }, 200000)
});
