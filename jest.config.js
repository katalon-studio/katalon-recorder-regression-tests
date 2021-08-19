module.exports = {
    preset: "jest-puppeteer",
    testMatch: [
        "**/tests/**.test.js"
    ],
    verbose: true,
    maxWorkers: "50%"
};