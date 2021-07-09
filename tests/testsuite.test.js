const ExtensionService = require('../services/extension.service');
const TestSuiteService = require('../services/testsuite.service');

describe("Run test case", () => {
    let extension = {};
    beforeAll(async() => {
        extension = await ExtensionService.getPageAndData("sample/data2.html");
    }, 10000);

    it("Run a test case without conditions", async() => {
        let result = await TestSuiteService.runTestSuite(extension.page);
        await expect(result).toBe(true);
    }, 10000);

    it("Run a test case from specified command", async() => {
        let result = await TestSuiteService.runAllTestSuites(page);
        expect(result).toBe(true);
    }, 10000);

    it("Run a test case from specified command", async() => {
        let result = await TestSuiteService.runFromSpecifiedTestcase(page);
        expect(result).toBe(true);
    }, 10000);

    afterAll(async() => { extension.browser.close() }, 10000)
});