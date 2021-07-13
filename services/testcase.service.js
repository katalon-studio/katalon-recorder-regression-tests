const runTestcase = async(page) => {
    await page.waitForSelector("#case0");
    await page.click('#case0');

    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        setTimeout(() => {
            console.log($('#playback'))
            $('#playback').click();
        }, 1000);
    }, 0);

    await page.waitForTimeout(500);
    await page.waitForFunction(function() {
        return isPlaying === false;
    }, { timeout: 0 });
    let result = await page.evaluate(function() {
        return $(`#case${0}`).hasClass("success");
    }, 0);
    return result;
}

const runFromSpecifiedCommandOfTestcase = async(page) => {
    await page.waitForSelector("#case1");
    await page.click('#case1');
    await page.click('#records-2');
    await page.click('#records-2', {
        button: 'right',
    });
    await page.click('#grid-play-from-here');
    await page.waitForTimeout(500);
    await page.waitForFunction(function() {
        return isPlaying === false;
    }, { timeout: 0 });
    let result = await page.evaluate(function() {
        return $(`#case1`).hasClass("success");
    }, 0);
    return result;
}

const runCommandOfTestCase = async(page) => {
    await page.waitForSelector("#case1");
    await page.click('#case1');
    await page.click('#records-2', {
        button: 'right',
    });
    await page.click('#grid-play-this-command');
    await page.waitForTimeout(500);
    await page.waitForFunction(function() {
        return isPlaying === false;
    }, { timeout: 0 });
    let result = await page.evaluate(function() {
        return $(`#records-2`).hasClass("success");
    }, 0);
    return result;
}

module.exports = {
    runTestcase,
    runFromSpecifiedCommandOfTestcase,
    runCommandOfTestCase
}