const runTestSuite = async(page) => {
    await page.evaluate(() => {
        $('#playSuite').click();
    }, 0);
    await page.waitForTimeout(500);
    await page.waitForFunction(function() {
        return $('#stop').is(':visible') === false;
    }, { timeout: 0 });
    let result = await page.evaluate(async function() {
        return {
            pass: parseFloat($(`#result-runs`).html()),
            fail: parseFloat($(`#result-failures`).html())
        };
    }, 0);
    return result;
}

const runAllTestSuites = async(page) => {
    await page.evaluate(() => {
        $('#case0').click();
        $('#playSuites').click();
    }, 0);
    await page.waitForTimeout(500);
    await page.waitForFunction(function() {
        return $('#stop').is(':visible') === false;
    }, { timeout: 0 });
    let result = await page.evaluate(async function() {
        return {
            pass: parseFloat($(`#result-runs`).html()),
            fail: parseFloat($(`#result-failures`).html())
        };
    }, 0);
    return result;
}

const runFromSpecifiedTestcase = async(page) => {
    const testCaseID = await page.evaluate(() => {
        const secondTestCase = KRData.testSuites[0].testCases[1];
        $(`#${secondTestCase.id}`).click();
        return secondTestCase.id;
    }, 0);
    await page.evaluate((testCaseID)=>{
        $(`#${testCaseID}`).contextmenu();
    }, testCaseID)
    /*await page.click(`#${testCaseID}`, {
        button: 'right'
    });*/
    await page.evaluate(function(testCaseID) {
        $(`#menu${testCaseID}`).find('a')[3].click();
    }, testCaseID);
    await page.waitForTimeout(500);
    await page.waitForFunction(function() {
        return $('#stop').is(':visible') === false;
    }, { timeout: 0 });
    let result = await page.evaluate(async function() {
        return {
            pass: parseFloat($(`#result-runs`).html()),
            fail: parseFloat($(`#result-failures`).html())
        };
    }, 0);
    return result;
}

module.exports = {
    runTestSuite,
    runAllTestSuites,
    runFromSpecifiedTestcase
}