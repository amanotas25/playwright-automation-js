Feature: Looking into playwright API testing

  Scenario: Verify GET all posts
    Given I request all posts
    Then the response status should be 200
      And the response should contain a list of posts

  Scenario: Verify GET post by ID
    Given I request a post with ID 55
    Then the response status should be 200
      And the response should contain the post title "sit vel voluptatem et non libero"

  Scenario: Verify POST create new post
    When I create a new post with body:
      """
      {
        "title": "This is cucumber test with playwright and API",
        "body": "I guess i'm just here, bro",
        "userId": 45
      }
      """
    Then the response status should be 201
      And the response should contain the post title "This is cucumber test with playwright and API"

  Scenario: Verify PUT update post
    When I update a post with id 5 and body:
      """
      {
        "title": "I just updated this with cucumber, playwright and API",
        "body": "Almost there, buddie",
        "userId": 42
      }
      """
    Then the response status should be 200
      And the response should contain the post title "I just updated this with cucumber, playwright and API"

  Scenario: Verify DELETE post
    When I delete a post with id 64
    Then the response status should be 200