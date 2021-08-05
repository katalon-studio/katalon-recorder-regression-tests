const runTestSuite = async(page) => {
    await page.evaluate(() => {
        $('#case0').click();
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
    await page.evaluate(() => {
        $('#case1').click();
    }, 0);
    await page.click('#case1', {
        button: 'right'
    });
    await page.evaluate(function() {
        $('#menucase1').find('a')[0].click();
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

module.exports = {
    runTestSuite,
    runAllTestSuites,
    runFromSpecifiedTestcase
}