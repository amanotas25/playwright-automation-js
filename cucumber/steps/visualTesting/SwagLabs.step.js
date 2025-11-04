const {Given, When, Then, Before, After} = require('@cucumber/cucumber');
const {chromium, expect} = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const {default: pixelmatch} = require('pixelmatch');

const SwagLabs = require('#pom/UI/swagLabs');

let swagLabs, page, browser;

Before(async function () {
    browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    page = await context.newPage();
    swagLabs = new SwagLabs(page);
});

After(async function () {
    await browser.close();
})

Given('I visit sauce demo', async function () {
    await swagLabs.goToSwagLabs();
    expect(await swagLabs.getPageTitle()).toEqual('Swag Labs');
});

When('I use credentials: {string}, {string}', async function (username, password) {
    await swagLabs.loginWithUser(username, password);
    await page.waitForTimeout(1000);
});

Then('I use image {string} expecting a visual difference with max tolerance of {float}',
    async function (imageName, maxTolerance) {
        const screenshotsDir = path.join(__dirname, '../../../screenshots');
        if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, {recursive: true});

        const baselinePath = path.join(screenshotsDir, imageName);
        const screenshot = await page.screenshot();

        if (!fs.existsSync(baselinePath)) {
            fs.writeFileSync(baselinePath, screenshot);
            console.log(`Baseline image created: ${imageName}`);
            return;
        }

        const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
        const current = PNG.sync.read(screenshot);
        const {width, height} = baseline;
        const diff = new PNG({width, height});

        const numDiffPixels = pixelmatch(baseline.data, current.data, diff.data, width, height, {threshold: 0.1});
        const diffRatio = numDiffPixels / (width * height);

        if (diffRatio > maxTolerance) fs.writeFileSync(`${screenshotsDir}/diff-${imageName}`, PNG.sync.write(diff));

        await expect(diffRatio).toBeLessThan(maxTolerance);
    });