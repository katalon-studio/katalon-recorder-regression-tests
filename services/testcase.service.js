const runTestcase = async(page) => {
    await page.evaluate(() => {
        const firstTestCase = KRData.testSuites[0].testCases[0];
        $(`#${firstTestCase.id}`).click();
        $('#playback').click();
    }, 0);

    await page.waitForFunction(function() {
        return isPlaying === false;
    }, { timeout: 0 });
    let result = await page.evaluate(function() {
        return $(`#case0`).hasClass("success");
    }, 0);
    return result;
}

const runFromSpecifiedCommandOfTestcase = async(page) => {
    const testCaseID = await page.evaluate(() => {
        const fifteenthTestCase = KRData.testSuites[0].testCases[14];
        $(`#${fifteenthTestCase.id}`).click();
        $('#records-2').click();
        return fifteenthTestCase.id;
    }, 0);
    await page.waitForTimeout(500);
    await page.click('#records-2', {
        button: 'right',
    });
    await page.click('#grid-play-from-here');
    await page.waitForFunction(function() {
        return isPlaying === false;
    }, { timeout: 0 });
    let result = await page.evaluate(function() {
        return $(`#${testCaseID}`).hasClass("success");
    }, testCaseID);
    return result;
}

const runCommandOfTestCase = async(page) => {
    const testCaseID = await page.evaluate(() => {
        const fifteenthTestCase = KRData.testSuites[0].testCases[14];
        $(`#${fifteenthTestCase.id}`).click();
        $('#records-2').click();
        return fifteenthTestCase.id;
    }, 0);
    await page.waitForTimeout(500);
    await page.click('#records-2', {
        button: 'right',
    });
    await page.click('#grid-play-this-command');
    await page.waitForFunction(function() {
        return isPlaying === false;
    }, { timeout: 0 });
    let result = await page.evaluate(function() {
        return $(`#records-2`).hasClass("executing");
    }, 0);
    return result;
}

module.exports = {
    runTestcase,
    runFromSpecifiedCommandOfTestcase,
    runCommandOfTestCase
}