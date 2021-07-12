const runTestSuite = async(page) => {
    await page.click('#case1');
    await page.click('#playSuite');
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
    await page.click('#case1');
    await page.click('#playSuites');
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
    await page.click('#case1');
    await page.click('#case1', {
        button: 'right'
    });
    await page.evaluate(function() {
        $('#menucase1').find('a')[3].click();
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