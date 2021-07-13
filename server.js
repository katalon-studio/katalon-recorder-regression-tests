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
        page.on('load', async() => {
            await page.evaluate(() => {
                $('#case1').click();
            }, 0);
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
            console.log(result);
        })



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