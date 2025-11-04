const {Given, When, Then, Before, After} = require("@cucumber/cucumber");

const {chromium, expect} = require("@playwright/test");

const RahulShatty = require("#pom/UI/rahulShatty");

let rahulShatty, page, browser;

Before(async function () {
    browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    page = await context.newPage();
    rahulShatty = new RahulShatty(page);
});

Given("I go to RahulShatty Academy", {timeout: 100000}, async function () {
    await rahulShatty.gotToRahulAcademy();
    expect(await rahulShatty.getPageTitle()).toEqual("Practice Page");
});

When('I perform actions in the header with the following values: {string}, {string}, {string}, {string}',
    async function (radioButtonNumber, country, dropdownOption, checkboxOption) {
        await rahulShatty.interactWithHeader(radioButtonNumber, country, dropdownOption, checkboxOption);
    });

Then('I expect the values {string}, {string}, {string}, {string} to be reflected on the page',
    async function (expectedRadioButtonNumber, expectedCountry, expectedDropdownOption, expectedCheckboxOption) {
        expect(await rahulShatty.getSelectedRadioButton(expectedRadioButtonNumber)).toBeTruthy();
        expect(await rahulShatty.getCountryInputValue()).toBe(expectedCountry);
        expect(await rahulShatty.getDropdownValue()).toBe(expectedDropdownOption);
        expect(await rahulShatty.getCheckboxValue(expectedCheckboxOption)).toBeTruthy();
    });

After(async function () {
    await browser.close();
});