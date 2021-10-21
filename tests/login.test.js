const ExtensionService = require('../services/extension.service');
const Login = require('../services/login.service');

// describe("Activate KR", () => {
//     it.concurrent("Can see Password rules when typing into the password field", async() => {
//         const { browser, page } = await ExtensionService.getPageAndData("sample/data.html");
//         let result = await Login.seePasswordRules(page);
//         await expect(result).toBe(true);
//         await browser.close();
//     }, 100000);

//     it.concurrent("Can log in KR successfully with an activated account", async() => {
//         const { browser, page } = await ExtensionService.getPageAndData("sample/data.html");
//         let result = await Login.loginSuccessfully(page);
//         await expect(result).toBe(true);
//         await browser.close();
//     }, 100000);
// });