const { config } = require('../configs/config-env');
const service = require("../jobs/browser.job");
const data = require("../jobs/data.job");

async function test() {
  const paths = config.extPath;

  try {
    let browser = await service.getChromiumBrowser(paths);
    let page = await service.openExtension(browser);

    await page.keyboard.press('Escape');
    await page.evaluate(function () {
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
    await new Promise((resolve, reject) => {setTimeout(resolve , 1000)})
    const wait =await page.evaluate(() => {return typeof window.readSuiteFromString})
    console.log(wait)
  } catch (e) {
    console.log(e)
  }
}

test()