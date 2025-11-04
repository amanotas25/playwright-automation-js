module.exports = { helloWorld };

async function helloWorld(page) {
    // The "page" argument is instance of Playwright Page class:
    // https://playwright.dev/docs/api/class-page/

    // Go to https://artillery.io/
    await page.goto('https://www.artillery.io/');
    // Click text=Docs
    await page.click('text=Docs');
}