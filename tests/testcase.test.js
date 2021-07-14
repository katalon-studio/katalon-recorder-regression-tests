const ExtensionService = require('../services/extension.service');
const TestCaseService = require('../services/testcase.service');

describe("Run test case", () => {

    it("Users can execute a test case with Play", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestCaseService.runTestcase(extension.page);
        await extension.browser.close();
        await expect(result).toBe(true);
    }, 100000);

    it("Users can execute parts of a test case with Play From Here from a test case's context menu", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestCaseService.runFromSpecifiedCommandOfTestcase(extension.page);
        await extension.browser.close();
        await expect(result).toBe(true);
    }, 100000);

    it("Users can execute a command with Play This Command from a test case’s context menu.", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestCaseService.runCommandOfTestCase(extension.page);
        await extension.browser.close();
        await expect(result).toBe(true);
    }, 100000);
});