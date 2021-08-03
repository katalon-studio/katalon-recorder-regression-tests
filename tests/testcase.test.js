const ExtensionService = require('../services/extension.service');
const TestCaseService = require('../services/testcase.service');

describe("Run test case", () => {
    let browser;
    afterEach(async () => {
        if (browser){
            await browser.close();
            browser = undefined;
        }
    })
    it("Users can execute a test case with Play", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        browser = extension.browser;
        let result = await TestCaseService.runTestcase(extension.page);
        await expect(result).toBe(true);
    }, 200000);

    it("Users can execute parts of a test case with Play From Here from a test case's context menu", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        browser = extension.browser;
        let result = await TestCaseService.runFromSpecifiedCommandOfTestcase(extension.page);
        await expect(result).toBe(true);
    }, 200000);

    it("Users can execute a command with Play This Command from a test case’s context menu.", async() => {
        let extension = await ExtensionService.getPageAndData("sample/data.html");
        browser = extension.browser;
        let result = await TestCaseService.runCommandOfTestCase(extension.page);
        await expect(result).toBe(true);
    }, 200000);
});