class rahulShatty {

    constructor(page){
        this.page = page;
    }

    //Locators
    #radioButton = (radioButtonNumber) => this.page.locator(`//input[@value="radio${radioButtonNumber}"]`);
    #countryInput = () => this.page.locator('//input[@id="autocomplete"]');
    #dropdownSelect = () => this.page.locator('#dropdown-class-example');
    #checkboxSelect = (checkBoxOption) => this.page.locator(`#checkBoxOption${checkBoxOption}`);
    //Locators

    //Actions
    async gotToRahulAcademy(){
        await this.page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    }

    async interactWithHeader(radioButtonNumber, countryName, dropdownOption, checkboxOption){
        await this.#radioButton(radioButtonNumber).click();
        await this.#countryInput().fill(countryName);
        await this.#dropdownSelect().selectOption(dropdownOption);
        await this.#checkboxSelect(checkboxOption).click();
    }
    //Actions

    //Getters
    async getPageTitle(){
        return await this.page.title();
    }

    async getSelectedRadioButton(radioButtonNumber){
        return await this.#radioButton(radioButtonNumber).isChecked();
    }

    async getCountryInputValue(){
        return await this.#countryInput().inputValue();
    }

    async getDropdownValue(){
        return await this.#dropdownSelect().evaluate(el => el.value);
    }

    async getCheckboxValue(checkboxOption){
        return await this.#checkboxSelect(checkboxOption).isChecked();
    }
    //Getters

}

module.exports = rahulShatty;