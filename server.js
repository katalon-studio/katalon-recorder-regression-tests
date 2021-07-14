const service = require("./jobs/browser.job");
const data = require("./jobs/data.job");
const { config } = require('./configs/config-env');

(async() => {
    // Define the extension path
    console.log(config.extPath)
    const paths = config.extPath;
    try {
        let browser = await service.getChromiumBrowser(paths);
        let page = await service.openExtension(browser);

        await page.keyboard.press('Escape');
        await page.evaluate(function() {
                let result = {
                    checkLoginData: {
                        recordTimes: 0,
                        playTimes: 0,
                        hasLoggedIn: true,
                        user: "",
                        isActived: true,
                        passedTestCase: 0
                    },
                };
                chrome.storage.local.set(result);
            })
            // await data.removeExistingData(page);

        const htmlFilePath = "sample/data.html";
        let sample = await data.loadSampleDataFile(htmlFilePath);
        await data.loadTestSuiteToExtension(page, sample)

        //play step by step and check status
        // for (let i = 0; i < testCases.count; i++) {
        // await page.waitForTimeout(1000);
        console.log(`Executing test case ${0}`);
        // await new Promise((resolve) => page.on('load', resolve));
        await page.waitForTimeout(500);
        // page.on('load', async() => {
        await page.waitForSelector('#case1');
        await page.evaluate(() => {
            $('#case1').click();
            $('#records-2').click();
        }, 0);
        await page.waitForTimeout(500);
        await page.click('#records-2', {
            button: 'right',
        });
        // await page.waitForTimeout(10000);
        await page.click('#grid-play-this-command');

        await page.waitForFunction(function() {
            return isPlaying === false;
        }, { timeout: 0 });
        let result = await page.evaluate(function() {
            return $(`#records-2`).hasClass("executing");
        }, 0);


        console.log(result);
        // })



        // }


        /*//play all and then check status
        await page.click("#playSuites");
        await page.waitForTimeout(500);
        await page.waitForSelector("#playback");
        await page.waitForFunction(function () {
          return isPlayingAll === false;
        }, {timeout: 0});
        const promises = [];
        for (let i = 0; i < testCases.count; i++){
          let promise = page.evaluate(function (i) {
            console.log(i);
            return Promise.resolve($(`#case${i}`).hasClass("success"));
          }, i);
          promises.push(promise);
        }
        let result = await Promise.all(promises);
        console.log(result);*/

        // await browser.close();

    } catch (err) {
        console.error(err);
    }
})();