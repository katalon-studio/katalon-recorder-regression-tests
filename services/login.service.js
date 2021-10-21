async function showPopupSignIn(page) {
    await page.evaluate(async function() {
        let result = await browser.storage.local.get("checkLoginData");

        result = {
            checkLoginData: {
                createTestCaseThreshold: 3,
                hasLoggedIn: false,
                isActived: false,
                playTimes: 3,
                recordTimes: 0,
                testCreated: 3,
                user: "",
            },
        };
        chrome.storage.local.set(result);
    });

    await page.waitForSelector(".test-suite-header");
    await page.hover('.test-suite-header');
    await page.click('.test-suite-header');

    await page.waitForSelector(".test-case-plus");
    await page.click('.test-case-plus');

    await page.on('dialog', dialog => dialog.accept('OK'));

    await page.waitForSelector("#createTestCase-okay");
    await page.click('#createTestCase-okay');
}

const seePasswordRules = async(page) => {
    await showPopupSignIn(page);

    await page.click('#pass');
    await page.keyboard.type('Hello123@#');

    let result = await page.evaluate(function() {
        return $(`#req-pass`).is(":visible");
    });

    return result;
}

const loginSuccessfully = async(page) => {
    await showPopupSignIn(page);

    await page.click(`a:contains('Sign in')`);
    let result = true;
    return result;
}

module.exports = {
    seePasswordRules,
    loginSuccessfully
}