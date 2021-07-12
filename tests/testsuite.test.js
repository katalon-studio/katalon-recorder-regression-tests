const ExtensionService = require('../services/extension.service');
const TestSuiteService = require('../services/testsuite.service');

describe("Run test suite", () => {
    let extension = {};

    beforeAll(async() => {
        extension = await ExtensionService.getPageAndData("sample/data2.html");
    }, 10000);

    it("Run a test case without conditions", async() => {
        let result = await TestSuiteService.runTestSuite(extension.page);
        await expect(result).toMatchObject({ pass: 13, fail: 2 });
    }, 20000);

    it("Run a test case from specified command", async() => {
        let result = await TestSuiteService.runAllTestSuites(extension.page);
        await expect(result).toMatchObject({ pass: 13, fail: 2 });
    }, 30000)

    it("Run a test case from specified command", async() => {
        let result = await TestSuiteService.runFromSpecifiedTestcase(extension.page);
        expect(result).toMatchObject({ pass: 10, fail: 2 });
    }, 40000)

    afterAll(async() => { await extension.browser.close() }, 50000);
});