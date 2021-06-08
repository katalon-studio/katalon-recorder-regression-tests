const service = require("./service/service");
const data = require("./service/data");

(async () => {
  // Define the extension path
  const paths = '/Users/tien.truong/Katalon/katalon-recorder-private/src/';
  try {
    let browser = await service.getChromiumBrowser(paths);
    let page = await service.openExtension(browser);

    await page.keyboard.press('Escape');
    await page.evaluate(function(){
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
    await data.removeExistingData(page);

    const htmlFilePath = "sample/Untitled Test Suite.html";
    let sample = await data.loadSampleDataFile(htmlFilePath);
    let testCases = await data.loadTestSuiteToExtension(page, sample);

    //play step by step and check status
    for (let i = 0; i < testCases.count; i++){
      console.log(`Executing test case ${i}`);
      await page.evaluate(function(i){
        $(`#case${i}`).click();
        $("#playback").click();
      }, i);
      await page.waitForTimeout(500);
      await page.waitForSelector("#playback");
      await page.waitForFunction(function () {
        return isPlaying === false;
      }, {timeout: 0});
      let result = await page.evaluate(function(i){
        return Promise.resolve($(`#case${i}`).hasClass("success"));
      }, i);
      console.log(`testcase ${i}: ${result}`);
    }


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

    await browser.close();

  } catch (err) {
    console.error(err);
  }
})();






