const ExtensionService = require('../services/extension.service');
const TestCaseService = require('../services/testcase.service');

describe("Run test case", () => {
    let extension = {};

    beforeAll(async() => {
        extension = await ExtensionService.getPageAndData("sample/data.html");
    }, 10000);

    beforeEach(async() => {
        await extension.page.waitForTimeout(1000);
    })

    it("Run a test case without conditions", async() => {
        extension.page.on('load', async() => {
            let result = await TestCaseService.runTestcase(extension.page);
            await expect(result).toBe(true);
        })
    }, 20000);

    it("Run a test case from specified command", async() => {
        extension.page.on('load', async() => {
            let result = await TestCaseService.runFromSpecifiedCommandOfTestcase(extension.page);
            await expect(result).toBe(true);
        })
    }, 30000);

    it("Run a test case from specified command", async() => {
        extension.page.on('load', async() => {
            let result = await TestCaseService.runCommandOfTestCase(extension.page);
            await expect(result).toBe(true);
        })
    }, 40000);

    afterAll(async() => { await extension.browser.close() }, 50000)
});