const ExtensionService = require('../services/extension.service');
const TestSuiteService = require('../services/testsuite.service');

describe("Run test suite", () => {
    it("Run a test suite", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data2.html");
        //await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestSuiteService.runTestSuite(extension.page);
        await extension.browser.close();
        await expect(result).toMatchObject({ pass: 11, fail: 3 });
    }, 1000000);

    it("Run all test suites", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data2.html");
        //await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestSuiteService.runAllTestSuites(extension.page);
        await extension.browser.close();
        await expect(result).toMatchObject({ pass: 11, fail: 3 });
    }, 1000000)

    it("Run a test suite from specified test case", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data2.html");
        //await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestSuiteService.runFromSpecifiedTestcase(extension.page);
        await extension.browser.close();
        expect(result).toMatchObject({ pass: 10, fail: 3 });
    }, 1000000)
});