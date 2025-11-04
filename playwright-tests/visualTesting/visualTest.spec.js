const { test, expect } = require('@playwright/test');
const SwagLabs = require('#pom/UI/swagLabs');

test.describe('Visual Testing - Sauce Demo / Swag Labs', () => {

    let swagLabs;

    test.beforeEach(async({page}) => {
        swagLabs = new SwagLabs(page);
        await swagLabs.goToSwagLabs();
        await page.waitForLoadState('networkidle');
    })

    test('Login Page visual snapshot', async({page}) => {
        await expect(page).toHaveScreenshot('clean-login.png', {
            maxDiffPixelRatio: 0.04,
        });
    });

    test('Login error visual snapshot', async({page}) => { //This test is expected to fail everytime
        await swagLabs.loginWithUser('standard_user', 'secret_sauce');
        await page.waitForSelector('.app_logo');

        //const loginContainer = page.locator('.login_wrapper');
        await expect(page).toHaveScreenshot('error-login.png', {
            maxDiffPixelRatio: 0.01
        });
    });
})