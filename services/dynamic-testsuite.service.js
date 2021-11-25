const TestSuiteService = require('../services/testsuite.service');

const createTagViaTagManagement = async(page) => {
    //open tag management panel
    await page.click("#tagging-features");
    //add new tag
    await page.click("#button-add-tag");
    //input tag's name
    await page.type("#content-input-tag", "feature-a");
    //choose the first 3 tags
    await page.click("div.item-checkbox-tag:nth-child(2) > input:nth-child(1)");
    await page.click("div.item-checkbox-tag:nth-child(3) > input:nth-child(1)");
    await page.click("div.item-checkbox-tag:nth-child(4) > input:nth-child(1)");
    //apply
    await page.click("#content-button-update");
    //add another tag
    await page.click("#button-add-tag");
    //input tag's name
    await page.type("#content-input-tag", "feature-b");
    //choose the next 3 tags
    await page.click("div.item-checkbox-tag:nth-child(5) > input:nth-child(1)");
    await page.click("div.item-checkbox-tag:nth-child(6) > input:nth-child(1)");
    await page.click("div.item-checkbox-tag:nth-child(7) > input:nth-child(1)");
    await page.click("#content-button-update");
    //click close button
    await page.click("#title-manage-tag > img:nth-child(3)");
}

const runByClickOnTestCaseTag = async(page) => {
    const testCaseID = await page.evaluate(() => {
        const firstTestCase = KRData.testSuites[0].testCases[0];
        return firstTestCase.id;
    }, 0);

    await page.click(`#tags-icon-${testCaseID}`);
    //click on test case's tag
    await page.click(`#button-tags${testCaseID} > div:nth-child(2)`);
    //click "Execute" button to create new dynamic test suite
    await page.click("#button-quick-actions > span:nth-child(2)");
    return await TestSuiteService.runTestSuite(page);
}

const runByCreateNewDynamicTestSuite = async(page) => {
    await page.click("#dynamic-plus");
    //type tag name to dynamic test suite tag filter
    await page.type("#input-dynamic > div:nth-child(3) > input:nth-child(1)", "feature-a");
    //click "Apply" button
    await page.click("#input-dynamic > div:nth-child(3) > div:nth-child(3)");

    return await TestSuiteService.runTestSuite(page);
}

module.exports = {
    createTagViaTagManagement,
    runByClickOnTestCaseTag,
    runByCreateNewDynamicTestSuite
}