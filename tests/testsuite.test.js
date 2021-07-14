const ExtensionService = require('../services/extension.service');
const TestSuiteService = require('../services/testsuite.service');

describe("Run test suite", () => {
    it("Users can execute a test suite with Play Suite", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestSuiteService.runTestSuite(extension.page);
        await extension.browser.close();
        await expect(result).toMatchObject({ pass: 14, fail: 2 });
    }, 100000);

    it("Users can execute all suites with Play All", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestSuiteService.runAllTestSuites(extension.page);
        await extension.browser.close();
        await expect(result).toMatchObject({ pass: 14, fail: 2 });
    }, 100000)

    it("Run a test suite from specified test case", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestSuiteService.runFromSpecifiedTestcase(extension.page);
        await extension.browser.close();
        expect(result).toMatchObject({ pass: 13, fail: 2 });
    }, 100000)
});