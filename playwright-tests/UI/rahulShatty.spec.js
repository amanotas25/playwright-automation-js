import {test, expect} from "@playwright/test";
const RahulShatty = require('#pom/UI/rahulShatty');

test('interacting with header stuff', async ({page}) =>{
    const rahulShatty = new RahulShatty(page);

    await rahulShatty.gotToRahulAcademy();
    await rahulShatty.interactWithHeader("2", "Colombia", "option3", "1");

    expect(await rahulShatty.getSelectedRadioButton("2")).toBeTruthy();
    expect(await rahulShatty.getCountryInputValue()).toBe("Colombia");
    expect(await rahulShatty.getDropdownValue()).toBe("option3");
    expect(await rahulShatty.getCheckboxValue("1")).toBeTruthy();
})