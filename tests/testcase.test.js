const ExtensionService = require('../services/extension.service');
const TestCaseService = require('../services/testcase.service');

describe("Run test case", () => {
    it.concurrent("Users can execute a test case with Play", async() => {
        const {browser, page} = await ExtensionService.getPageAndData("sample/data.html");
        let result = await TestCaseService.runTestcase(page);
        await expect(result).toBe(true);
        await browser.close();
    }, 100000);

    it.concurrent("Users can execute parts of a test case with Play From Here from a test case's context menu", async() => {
        const {browser, page} = await ExtensionService.getPageAndData("sample/data.html");
        let result = await TestCaseService.runFromSpecifiedCommandOfTestcase(page);
        await expect(result).toBe(true);
        await browser.close();
    }, 100000);

    it.concurrent("Users can execute a command with Play This Command from a test case’s context menu.", async() => {
        const {browser, page} = await ExtensionService.getPageAndData("sample/data.html");
        let result = await TestCaseService.runCommandOfTestCase(page);
        await expect(result).toBe(true);
        await browser.close();
    }, 10000);
});
