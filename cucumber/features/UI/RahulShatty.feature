Feature: Looking into RahulShatty Academy with Playwright

  Scenario Outline: Verify basic functionalities
    Given I go to RahulShatty Academy
    When I perform actions in the header with the following values: <radioButtonNumber>, <Country>, <dropdownOption>, <checkboxOption>
    Then I expect the values <radioButtonNumber>, <Country>, <dropdownOption>, <checkboxOption> to be reflected on the page
    Examples:
      | radioButtonNumber | Country   | dropdownOption | checkboxOption |
      | "2"               | "Colombia"  | "option3"    | "1"            |
      | "1"               | "Argentina" | "option2"    | "2"            |
      | "3"               | "Mexico"    | "option1"    | "3"            |
      | "2"               | "Brazil"    | "option1"    | "1"            |