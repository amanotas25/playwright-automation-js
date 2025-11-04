Feature: Visual testing in Sauce Demo / Swag Labs

  Scenario Outline: Visual testing with error users
    Given I visit sauce demo
    When I use credentials: <Username>, <Password>
    Then I use image <ImageName> expecting a visual difference with max tolerance of <MaxTolerance>

    Examples:
      | Username                     | Password                | ImageName                  | MaxTolerance |
      | "wrong_user"                 | "wrong_pass"            | "cucumber-error-login.png" | 0.04         |
      | ""                           | ""                      | "cucumber-clean-login.png" | 0.04         |
      | "locked_out_user"            | "secret_sauce"          | "cucumber-error-login.png" | 0.04         |
      | "standard_user"              | "secret_sauce"          | "clean-login.png"          | 0.04         |
    #Last scenario is expected to fail everytime