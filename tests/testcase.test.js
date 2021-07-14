const ExtensionService = require('../services/extension.service');
const TestCaseService = require('../services/testcase.service');

describe("Run test case", () => {

    it("Run a test case without conditions", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        //await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestCaseService.runTestcase(extension.page);
        await expect(result).toBe(true);
        await extension.browser.close();
    }, 1000000);

    it("Run a test case from specified command", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        //await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestCaseService.runFromSpecifiedCommandOfTestcase(extension.page);
        await expect(result).toBe(true);
        await extension.browser.close();
    }, 1000000);

    it("Run a test case from specified command", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        //await new Promise((resolve) => extension.page.on('load', resolve));
        let result = await TestCaseService.runCommandOfTestCase(extension.page);
        await expect(result).toBe(true);
        await extension.browser.close();
    }, 1000000);
});
