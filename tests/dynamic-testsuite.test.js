const ExtensionService = require('../services/extension.service');
const DynamicTestSuiteService = require('../services/dynamic-testsuite.service');

describe("Run dynamic test suite", () => {
    it("Run dynamic test suite by click on test case's tag", async() => {
        const {browser, page} = await ExtensionService.getPageAndData("sample/data.html");
        await DynamicTestSuiteService.createTagViaTagManagement(page);
        const result = await DynamicTestSuiteService.runByClickOnTestCaseTag(page);
        expect(result).toMatchObject({ pass: 3, fail: 0 });
        await browser.close();
    }, 100000);

    it("Run dynamic test suite by create new one", async() => {
        const {browser, page} = await ExtensionService.getPageAndData("sample/data.html");
        await DynamicTestSuiteService.createTagViaTagManagement(page);
        const result = await DynamicTestSuiteService.runByClickOnTestCaseTag(page);
        expect(result).toMatchObject({ pass: 3, fail: 0 });
        await browser.close();
    }, 100000);

});
