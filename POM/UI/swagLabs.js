const {expect} = require("@playwright/test");

class swagLabs {

    constructor(page) {
        this.page = page;
    }

    //Locators
    #usernameInput = () => this.page.locator('#user-name');
    #passwordInput = () => this.page.locator('#password');
    #loginButton = () => this.page.locator('#login-button');
    //Locators

    //Actions
    async goToSwagLabs() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginWithUser(email, password) {
        await this.#usernameInput().fill(email);
        await this.#passwordInput().fill(password);
        await this.#loginButton().click();
    }

    async takeScreenshot(name){
        await this.page.screenshot({path: `../screenshots/${name}.png`, fullPage: true});
    }
    //Actions

    //Getters
    async getPageTitle(){
        return await this.page.title();
    }
    //Getters

}

module.exports = swagLabs;