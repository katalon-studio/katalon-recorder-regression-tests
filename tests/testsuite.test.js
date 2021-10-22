const ExtensionService = require('../services/extension.service');
const TestSuiteService = require('../services/testsuite.service');

describe("Run test suite", () => {
    it.concurrent("Users can execute a test suite with Play Suite", async() => {
        const extension = await ExtensionService.getPageAndData("sample/data.html");
        throw extension.page;
        const browser = extension.browser;
        const extensionPage= extension.page;
        const result = await TestSuiteService.runTestSuite(extensionPage);
        await expect(result).toMatchObject({ pass: 14, fail: 2 });
        await browser.close();
    }, 200000);

    it.concurrent("Users can execute all suites with Play All", async() => {
        const extension = await ExtensionService.getPageAndData("sample/data.html");
        const browser = extension.browser;
        const extensionPage= extension.page;
        const result = await TestSuiteService.runAllTestSuites(extensionPage);
        await expect(result).toMatchObject({ pass: 14, fail: 2 });
        await browser.close();
    }, 200000)

    it.concurrent("Run a test suite from specified test case", async() => {
        const extension = await ExtensionService.getPageAndData("sample/data.html");
        const browser = extension.browser;
        const extensionPage= extension.page;
        const result = await TestSuiteService.runFromSpecifiedTestcase(extensionPage);
        expect(result).toMatchObject({ pass: 13, fail: 2 });
        await browser.close();
    }, 200000)
});
