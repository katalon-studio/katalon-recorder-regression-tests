const ExtensionService = require('../services/extension.service');
const TestCaseService = require('../services/testcase.service');

describe("Run test case", () => {
    let extension = {};
    beforeAll(async() => {
        extension = await ExtensionService.getPageAndData("sample/data.html");
    }, 10000);

    it("Run a test case without conditions", async() => {
        let result = await TestCaseService.runTestcase(extension.page);
        await expect(result).toBe(true);
    }, 10000);

    it("Run a test case from specified command", async() => {
        let result = await TestCaseService.runFromSpecifiedCommandOfTestcase(page);
        expect(result).toBe(true);
    }, 10000);

    it("Run a test case from specified command", async() => {
        let result = await TestCaseService.runFromSpecifiedTestcase(page);
        expect(result).toBe(true);
    }, 10000);

    afterAll(async() => { extension.browser.close() }, 10000)
});