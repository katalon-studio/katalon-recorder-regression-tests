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
                browser.storage.local.set(result);
            })
            // await data.removeExistingData(page);

        const htmlFilePath = "sample/data2.html";
        let sample = await data.loadSampleDataFile(htmlFilePath);
        let testCases = await data.loadTestSuiteToExtension(page, sample);

        //play step by step and check status
        // for (let i = 0; i < testCases.count; i++) {

        console.log(`Executing test case ${0}`);
        await page.click('#case1');
        await page.click('#playSuite');
        // await page.evaluate(function() {
        //     $(`#case${1}`).click();
        //     $(`#records-${2}`).click();
        //     $(`#records-${2}`).contextmenu();
        //     console.log($('#grid-play-from-here').find("a").click())
        //     $('#grid-play-from-here').find("a").click();
        //     // $("#playback").click();
        // }, 0);
        await page.waitForTimeout(500);
        await page.waitForSelector("#playSuite");
        await page.waitForFunction(function() {
            isPlayingSuite === false;
        }, { timeout: 0 });
        let result = await page.evaluate(function() {
            return ($(`#result-runs`).html());
        }, 0);
        console.log(`testcase 1: ${result}`);
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