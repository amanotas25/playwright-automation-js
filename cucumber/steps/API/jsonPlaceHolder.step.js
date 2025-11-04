const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const {request, expect} = require("@playwright/test");
const JsonPlaceHolder = require("#pom/API/jsonPlaceHolder");

let apiContext, jsonPlaceHolder, response;

Before(async function () {
    apiContext = await request.newContext();
    jsonPlaceHolder = new JsonPlaceHolder(apiContext);
})

After(async function () {
    await apiContext.dispose();
})

Given('I request all posts', async () => {
    response = await jsonPlaceHolder.getAllPosts();
})

Given('I request a post with ID {int}', async (postId) => {
    response = await jsonPlaceHolder.getPostById(postId);
})

When('I create a new post with body:', async (postBody) => {
    postBody = JSON.parse(postBody);
    response = await jsonPlaceHolder.createPost(postBody.title, postBody.body, postBody.userId);
})

When('I update a post with id {int} and body:', async (postId, postBody) => {
    postBody = JSON.parse(postBody);
    response = await jsonPlaceHolder.updatePost(
        postId,
        postBody.title,
        postBody.body,
        postBody.userId);
})

When('I delete a post with id {int}', async (postId) => {
    response = await jsonPlaceHolder.deletePost(postId);
})

Then('the response status should be {int}', async function (expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
})

Then('the response should contain a list of posts', async () => {
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(100);
})

Then('the response should contain the post title {string}', async function (expectedPostTitle) {
    const body = await response.json();
    expect(body.title).toBe(expectedPostTitle);
})
