const puppeteer = require('puppeteer');
const browserSize = {
  width: 870,
  height: 740
}

async function openExtension(browser) {
  // find extension background target and load the page
  const extBackgroundTarget = await browser.waitForTarget(t => t.type() === 'background_page');
  const extBackgroundPage = await extBackgroundTarget.page()

  // evaluate chrome object in context of background page:
  await extBackgroundPage.evaluate(() => {
    chrome.tabs.query({ active: true }, tabs => {
      chrome.browserAction.onClicked.dispatch(tabs[0]);
    })
  });
  let extensionPopupURL = await getExtensionPopupURL(browser);
  let extensionTarget = await browser.waitForTarget(target => {
    return target.url() === extensionPopupURL;
  });

  await browser.newPage();

  let page = await extensionTarget.page();
  //wait for page to finnish loading
  await page.waitForTimeout(1000);
  return page;
}

async function getExtensionPopupURL(browser) {
  // Name of the extension
  const extensionName = 'addon_name_placeholder';
  const extensionPanelURL = 'panel/index.html';

  // Find the extension
  const targets = await browser.targets();
  const extensionTarget = targets.find(({ _targetInfo }) => {
    return _targetInfo.title === extensionName && _targetInfo.type === 'background_page';
  });
  // Extract the URL
  const extensionURL = extensionTarget._targetInfo.url;
  const urlSplit = extensionURL.split('/');
  const extensionID = urlSplit[2];

  // Define the extension page
  return `chrome-extension://${extensionID}/${extensionPanelURL}`;
}

async function getChromiumBrowser(extensionPath) {
  return await puppeteer.launch({
    headless: false,
    // Chrome options
    ignoreDefaultArgs: ["--disable-extensions"],
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      `--window-size=${browserSize.width},${browserSize.height}`
    ]
  });
}



module.exports = {
  getChromiumBrowser,
  openExtension
}