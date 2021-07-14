const runTestcase = async(page) => {
    await page.evaluate(() => {
        $('#case0').click();
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
    await page.evaluate(() => {
        $('#case15').click();
        $('#records-2').click();
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
        return $(`#case15`).hasClass("success");
    }, 0);
    return result;
}

const runCommandOfTestCase = async(page) => {
    await page.evaluate(() => {
        $('#case15').click();
        $('#records-2').click();
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